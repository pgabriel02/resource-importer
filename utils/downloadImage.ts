import { makeImgFolder, removeImgFolder, removeResourceFolder } from './filesManager'
import { createWriteStream } from 'fs'
import { markdownDestination } from '../config'
import path from 'path'
import request from 'request'

export function downloadImage(url: string, title: string) {
	const filePath = path.join(markdownDestination, title, 'img', `${title}${path.extname(url)}`)
	makeImgFolder(title)

	request(url)
		.pipe(createWriteStream(filePath))
		.on('ready', () => {
			console.info('Image downloaded successfully!')
		})
		.on('error', (err) => {
			console.error('Error downloading image', err)
			removeResourceFolder(title)
			removeImgFolder(title)
		})
}
