import request from 'request'
import path from 'path'
import { createWriteStream } from 'fs'
import { markdownDestination } from '../config'
import { makeImgFolder, removeImgFolder, removeResourceFolder } from './filesManager'


export function downloadImage(url: string, title: string) {
	const filePath = path.join(markdownDestination, title, 'img', `${title}${path.extname(url)}`)
	makeImgFolder(title)

	request(url).pipe(createWriteStream(filePath)).on('ready', () => {
		console.log('Image downloaded with successfully!')
	}).on('error', (err) => {
		console.log('Error downloading image', err)
		removeResourceFolder(title)
		removeImgFolder(title)
	})
}
