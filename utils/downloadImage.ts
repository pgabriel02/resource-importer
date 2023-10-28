import path from 'path'
import { createWriteStream } from 'fs'
import { markdownDestination } from '../config'
import { makeImgFolder } from './filesManager'
import axios from 'axios'


export async function downloadImage(url: string, title: string) {
	const filePath = path.join(markdownDestination, title, 'img', `${title}${path.extname(url)}`)
	makeImgFolder(title)
	const response = await axios.get(url, { responseType: 'stream' })

	await response.data.pipe(createWriteStream(filePath))
}
