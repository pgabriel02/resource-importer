import path from "path";
import { isVideo, removeSpecialCharacters, replaceMarkdownKeys } from "./general";
import { commonMarkdownInfo } from "../config";

type Props = {
	title: string;
	description: string;
	url: string;
	banner: string;
	type?: string;
}


export default function getResourceMarkdownData(args: Props) {
	let { banner, title } = args
	const type = isVideo(banner || '') ? 'video' : 'article'
	const titleWithoutSpecialCharacters = removeSpecialCharacters(title).toLocaleLowerCase()

	
	args.type = type
	args.banner = banner ? path.join('.', 'img', `${titleWithoutSpecialCharacters}${path.extname(banner)}`) : ''

	let currentMarkdownValue = commonMarkdownInfo

	for(const key of Object.keys(args)) {
		currentMarkdownValue = replaceMarkdownKeys(currentMarkdownValue, key, (args as Record<string, string>)[key] || '@TODO')
	}

	return currentMarkdownValue
}