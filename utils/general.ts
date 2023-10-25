import { URL } from 'url'
import slugify from 'slugify'

export function removeSpecialCharacters(string: string) {
	return slugify(string, {
		lower: true,
		replacement: '-',
		remove: /([*+~.()'"!:@,`/])/gu  })
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