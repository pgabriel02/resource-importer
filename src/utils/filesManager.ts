import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import path from 'path'

export function removeMarkdownFiles(title: string, contentPath: string, banner: string = '') {
	const markdownFilePath = path.join(contentPath, `${title}.md`);
	const markdownImgPath = path.join(contentPath, 'img', `${title}${path.extname(banner)}`);
	try {
		if(existsSync(markdownFilePath)) rmSync(markdownFilePath, { force: true, recursive: true });
		if(banner && existsSync(markdownImgPath)) rmSync(markdownImgPath, { force: true, recursive: true });
	} catch(err) {
		throw new Error(`Error removing Markdown files: ${err}`);
	}
}

export function makeMarkdownFile(title: string, content: string, contentPath: string) {
	try {
		writeFileSync(path.join(contentPath, `${title}.md`), content);
	} catch (error) {
		throw new Error(`Error writing Markdown file: ${error}`);
	}
}


export function makeImgFolder(contentPath: string) {
	const imgFolderPath = path.join(contentPath, 'img');
	try {
		if (!existsSync(imgFolderPath)) {
			mkdirSync(imgFolderPath, { recursive: true });
		}
	} catch (error) {
		throw new Error(`Error creating image folder: ${error}`);
	}
}

export function removeImgFile(title: string, imgUrl: string, contentPath: string) {
	const imgPath = path.join(contentPath, 'img', `${title}${path.extname(imgUrl)}`);
	if (!existsSync(imgPath)) throw new Error('Image file does not exists');
	try {
		rmSync(imgPath, { recursive: true, force: true });
	} catch (error) {
		throw new Error(`Image folder could not be deleted: ${error}`);
	}
}
