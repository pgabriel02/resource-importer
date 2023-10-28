import { isVideo, removeSpecialCharacters, replaceMarkdownKeys } from './general'
import { commonMarkdownInfo } from '../config'
import path from 'path'

type Props = {
	title: string
	description: string
	url: string
	banner: string
	type?: string
	[key: string]: string | undefined
}

export default function getResourceMarkdownData(args: Props) {
	let { banner, title, url } = args
	const type = isVideo(url) ? 'video' : 'article'
	const titleWithoutSpecialCharacters = removeSpecialCharacters(title).toLocaleLowerCase()

	args.type = type
	args.banner = banner ? `./img/${titleWithoutSpecialCharacters}${path.extname(banner)}` : ''

	let currentMarkdownValue = commonMarkdownInfo

	for (const key in args) {
		currentMarkdownValue = replaceMarkdownKeys(currentMarkdownValue, key, args[key] || '@TODO')
	}

	return currentMarkdownValue
}
