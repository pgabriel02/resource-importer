import { isURLValid, removeSpecialCharacters } from './general'
import { makeMarkdownFile, makeResourceFolder, removeResourceFolder } from './filesManager'
import { downloadImage } from './downloadImage'
import getResourceMarkdownData from './getResourceMarkdownData'
import metaFetcher from 'meta-fetcher'

export default async function generateResourceFileWithMetadata(url: string) {
	let titleWithoutSpecialCharacters: string = '',
		resourceFolderCreated: boolean = false
	try {
		if (!isURLValid(url)) throw new Error('Invalid URL')

		const response = await metaFetcher(url)
		if (!response || !response.metadata) throw new Error('No response from metaFetcher')

		let {
			metadata: { title, description, banner, website },
		} = response

		title = /\s/.test(title.slice(-1)) ? title.slice(0, -1) : title // remove last space if there is one

		titleWithoutSpecialCharacters = removeSpecialCharacters(title)

		// make resource folder
		resourceFolderCreated = makeResourceFolder(titleWithoutSpecialCharacters)

		if (banner && resourceFolderCreated) {
			// download resource image and save it to the resource folder
			await downloadImage(banner, titleWithoutSpecialCharacters) // throws error if download fails and stops the script
		}

		const markdownData = getResourceMarkdownData({
			title,
			description: description || '',
			url: website,
			banner: banner || '',
		})

		// make markdown file
		try {
			makeMarkdownFile(titleWithoutSpecialCharacters, markdownData)
			console.info(`Markdown file for ${title} created`) // successfully message
		} catch (error) {
			console.warn(`Error while trying to make markdown file for ${titleWithoutSpecialCharacters}, removing folder...`)
			removeResourceFolder(titleWithoutSpecialCharacters)
			throw new Error(`Error writing Markdown file: ${error}`)
		}
	} catch (err) {
		console.error('ERROR WHILE TRYING TO MAKE METADATA', err)
	}
}
