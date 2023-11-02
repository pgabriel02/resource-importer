import { isVideo, removeSpecialCharacters, replaceMarkdownKeys } from './general';
import path from 'path';

type Props = {
	title: string;
	description: string;
	url: string;
	banner: string;
	type?: string;
	[key: string]: string | undefined;
};

export function getResourceMarkdownData(markdownConfig: string, args: Props) {
	let { banner, title, url } = args;
	const type = isVideo(url) ? 'video' : 'article';
	const titleWithoutSpecialCharacters = removeSpecialCharacters(title).toLocaleLowerCase();

	args.type = type;
	args.banner = banner ? `./img/${titleWithoutSpecialCharacters}${path.extname(banner)}` : '@TODO';

	let currentMarkdownValue = markdownConfig;

	for (const key in args) {
		currentMarkdownValue = replaceMarkdownKeys(currentMarkdownValue, key, args[key] || '@TODO');
	}

	return currentMarkdownValue;
}
