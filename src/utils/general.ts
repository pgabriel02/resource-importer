import { URL } from 'url'
import slugify from 'slugify'
import path from 'path';
import { elementsToBeEditedType } from './generateResourceFileWithMetadata';
import { existsSync } from 'fs';



export function removeSpecialCharacters(string: string): string {
	// const symbolsRegex = /([*+~.()'"!:@,`#/])/gu
	// const emojiRegex = /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F3A0}-\u{1F3FF}]/gu
	const urlFriendlyRegex = /[^-a-z0-9\w\s]/gi;
	const sanitizedString = string
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(urlFriendlyRegex, '-');
	return slugify(sanitizedString, {
		lower: true,
		replacement: '-',
		remove: urlFriendlyRegex,
	});
}

export function replaceMarkdownKeys(markdown: string, key: string, value: string): string {
	const regExp = new RegExp("\\{\\{" + key + "\\}\\}", "gu");
	return markdown.replace(regExp, value);
}

export function isVideo(url: string): boolean {
	return url.includes('youtube') || url.includes('vimeo');
}

export function isURLValid(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}


export function existsBannerInConfig(elementsToBeEdited: elementsToBeEditedType): boolean {
	return Object.values(elementsToBeEdited).includes('banner')
}


export function generateContentPath(contentKey: string): string {
	const contentPath = path.join(process.cwd(), 'src', 'content', `${contentKey}`)
	if(!existsSync(contentPath)) throw new Error(`Path ${path} does not exists`)
	return contentPath;
}
