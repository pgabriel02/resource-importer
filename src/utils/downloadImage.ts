import axios from 'axios';
import { createWriteStream } from 'fs';
import { makeImgFolder } from './filesManager';
import path from 'path';


export async function downloadImage (url: string, title: string, contentPath: string) {
	const filePath = path.join(contentPath, 'img', `${title}${path.extname(url)}`);
	makeImgFolder(contentPath);
	const response = await axios.get(url, { responseType: 'stream' });

	await response.data.pipe(createWriteStream(filePath));
};