import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs"
import path from "path"
import { markdownDestination } from "../config"

export function makeResourceFolder(title: string) {
	const folderPath = path.join(markdownDestination, title)
	if(existsSync(folderPath)) throw new Error('Resource already exists')
	mkdirSync(folderPath, { recursive: true })
}

export function removeResourceFolder(title: string) {
	const folderPath = path.join(markdownDestination, title)
	if(!existsSync(folderPath)) throw new Error('Resource does not exists')
	rmSync(folderPath, { recursive: true, force: true })
}

export function makeMarkdownFile(title: string, content: string) {
	writeFileSync(path.join(markdownDestination, title, `${title}.md`), content)
}

export function makeImgFolder(title: string) {
	mkdirSync(path.join(markdownDestination, title, 'img'), { recursive: true })
}

export function removeImgFolder(title: string) {
	const imgFolderPath = path.join(markdownDestination, title, 'img')
	if(!existsSync(imgFolderPath)) throw new Error('Image folder does not exists')
	rmSync(imgFolderPath, { recursive: true, force: true })
}