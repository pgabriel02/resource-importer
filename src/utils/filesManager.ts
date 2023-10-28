import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { markdownDestination } from '../../config'
import path from 'path'

export function makeResourceFolder(title: string) {
	const folderPath = path.join(markdownDestination, title);
	if (existsSync(folderPath)) throw new Error('Resource already exists');
	try {
		mkdirSync(folderPath, { recursive: true });
		return true;
	} catch (error) {
		throw new Error(`Resource folder could not be created: ${error}`);
	}
}

export function removeResourceFolder(title: string) {
	const folderPath = path.join(markdownDestination, title);
	if (!existsSync(folderPath)) throw new Error('Resource does not exist');
	try {
		rmSync(folderPath, { recursive: true, force: true });
	} catch (error) {
		throw new Error(`Resource folder could not be deleted: ${error}`);
	}
}

export function makeMarkdownFile(title: string, content: string) {
	try {
		writeFileSync(path.join(markdownDestination, title, `${title}.md`), content);
	} catch (error) {
		throw new Error(`Error writing Markdown file: ${error}`);
	}
}

export function makeImgFolder(title: string) {
	const imgFolderPath = path.join(markdownDestination, title, 'img');
	try {
		if (!existsSync(imgFolderPath)) {
			mkdirSync(imgFolderPath, { recursive: true });
		}
	} catch (error) {
		throw new Error(`Error creating image folder: ${error}`);
	}
}

export function removeImgFolder(title: string) {
	const imgFolderPath = path.join(markdownDestination, title, 'img');
	if (!existsSync(imgFolderPath)) throw new Error('Image folder does not exists');
	try {
		rmSync(imgFolderPath, { recursive: true, force: true });
	} catch (error) {
		throw new Error(`Image folder could not be deleted: ${error}`);
	}
}
