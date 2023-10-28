import axios from 'axios'
import { createWriteStream } from 'fs'
import { makeImgFolder } from './filesManager'
import { markdownDestination } from '../config'
import path from 'path'

export async function downloadImage(url: string, title: string) {
	const filePath = path.join(markdownDestination, title, 'img', `${title}${path.extname(url)}`)
	makeImgFolder(title)
	const response = await axios.get(url, { responseType: 'stream' })

	await response.data.pipe(createWriteStream(filePath))
}
