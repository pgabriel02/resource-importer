import { mkdirSync, rmdirSync, writeFileSync } from "fs"
import path from "path"
import { markdownDestination } from "../config"

export function makeResourceFolder(title: string) {
	mkdirSync(path.join(markdownDestination, title), { recursive: true })
}

export function removeResourceFolder(title: string) {
	rmdirSync(path.join(markdownDestination, title), { recursive: true })
}

export function makeMarkdownFile(title: string, content: string) {
	writeFileSync(path.join(markdownDestination, title, `${title}.md`), content)
}

export function makeImgFolder(title: string) {
	mkdirSync(path.join(markdownDestination, title, 'img'), { recursive: true })
}

export function removeImgFolder(title: string) {
	rmdirSync(path.join(markdownDestination, title, 'img'), { recursive: true })
}