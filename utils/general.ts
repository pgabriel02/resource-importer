import { URL } from 'url'
import slugify from 'slugify'

export function removeSpecialCharacters(string: string) {
	const symbolsRegex = /([*+~.()'"!:@,`#/])/gu
	const emojiRegex = /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F3A0}-\u{1F3FF}]/gu
	return slugify(string, {
		lower: true,
		replacement: '-',
		remove: symbolsRegex   
	}).replace(emojiRegex, '')
}


export function replaceMarkdownKeys(markdown: string, key: string, value: string) {
	return markdown.replace(new RegExp(`rename${key}`, 'g'), value)
}

export function isVideo(url: string) {
	return url.includes('youtube') || url.includes('vimeo')
}

export function isURLValid(url: string) {
	try {
		new URL(url)
		return true;
	} catch(err) {
		return false;
	}
}