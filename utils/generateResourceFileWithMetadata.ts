import metaFetcher from "meta-fetcher";
import { isURLValid, removeSpecialCharacters } from "./general";
import { makeMarkdownFile, makeResourceFolder } from "./filesManager";
import getResourceMarkdownData from "./getResourceMarkdownData";
import { downloadImage } from "./downloadImage";


export default async function generateResourceFileWithMetadata(url: string) {
	try {
		if(!isURLValid(url)) throw new Error('No url provided')
		
		const response = await metaFetcher(url)
		if(!response) throw new Error('No response from metaFetcher')

		let { metadata: { title, description, banner, website } } = response
	
		title = /\s/.test(title.slice(-1)) ? title.slice(0, -1) : title // remove last space if there is one
	
	
		const titleWithoutSpecialCharacters = removeSpecialCharacters(title)
		console.log(titleWithoutSpecialCharacters, title)
		
		// make resource folder
		makeResourceFolder(titleWithoutSpecialCharacters)

		if(banner) {
			// download resource image and save it to the resource folder
			downloadImage(banner || '', titleWithoutSpecialCharacters) // throws error if download fails and stops the script
		}
	
		const markdownData = getResourceMarkdownData({ title, description: description || '', url: website, banner: banner || '' })
	
		// make markdown file
		makeMarkdownFile(titleWithoutSpecialCharacters, markdownData)

		console.info(`Markdown file for ${title} created`) // successfully message
	} catch(err) {
		console.log('ERROR WHILE TRYING TO MAKE METADATA', err)
	}
}

