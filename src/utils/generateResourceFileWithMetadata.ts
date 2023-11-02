import { existsBannerInConfig, generateContentPath, isURLValid, removeSpecialCharacters } from './general'
import { makeMarkdownFile, removeMarkdownFiles } from './filesManager';
import { downloadImage } from './downloadImage';
import { getResourceMarkdownData } from './getResourceMarkdownData';
import metaFetcher from 'meta-fetcher';
import { generateConfig } from './parseDataCollection';
import _ from 'lodash';

type configType = Record<string, any>[]
export type elementsToBeEditedType = Record<string, string>

type Props= {
	url: string;
	contentKey: string;
	configData: configType;
	elementsToBeEdited: elementsToBeEditedType;
}


function getConfig(config: configType) {
	if(!config)	throw new Error('No config provided')
	if(!_.isArray(config)) throw new Error('Config must be an array')
	if(config.length === 0) throw new Error('Config must not be empty')
	console.log(config[0])
	return config[0].data
}

/**
 * 
 * @param url Entity URL from which the information will be extracted
 * @param contentKey Key that will be used to create the folder where the resource will be saved
 * @param configData Config data that will be used to generate the markdown file
 * @param elementsToBeEdited Elements that will be edited in the markdown file
 * @returns A promise that resolves when the resource file is generated
 */


export async function generateResourceFileWithMetadata({ url, contentKey, configData, elementsToBeEdited }: Props): Promise<void> {
	let titleWithoutSpecialCharacters: string = '', bannerUrl: string | undefined = '', contentPath: string = ''
	try {
		if (!isURLValid(url)) throw new Error('Invalid URL');

		const response = await metaFetcher(url);
		if (!response || !response.metadata) throw new Error('No response from metaFetcher');

		let {
			metadata: { title, description, banner, website },
		} = response;

		bannerUrl = banner;
		contentPath = generateContentPath(contentKey);
		title = /\s/.test(title.slice(-1)) ? title.slice(0, -1) : title; // remove last space if there is one
		titleWithoutSpecialCharacters = removeSpecialCharacters(title);

		const config = getConfig(configData)
		const markdownConfigAsText = generateConfig(config, elementsToBeEdited)
		const canUploadImage = existsBannerInConfig(elementsToBeEdited)
		// make resource folder
		if (banner && canUploadImage) {
			// download resource image and save it to the resource folder
			await downloadImage(banner, titleWithoutSpecialCharacters, contentPath);
		}

		const markdownData = getResourceMarkdownData(markdownConfigAsText, {
			title,
			description: description || '',
			url: website,
			banner: banner || '',
		});

		// make markdown file
		try {
			makeMarkdownFile(titleWithoutSpecialCharacters, markdownData, contentPath);
			console.info(`Markdown file for ${title} created`); // successfully message
		} catch (error) {
			console.warn(`Error while trying to make markdown file for ${titleWithoutSpecialCharacters}, removing folder...`);
			throw new Error(`Error writing Markdown file: ${error}`);
		}
	} catch (err) {
		if(contentPath)
			removeMarkdownFiles(titleWithoutSpecialCharacters, contentPath, bannerUrl);

		console.error('ERROR WHILE TRYING TO MAKE METADATA', err);
	}
};
