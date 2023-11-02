import { generateResourceFileWithMetadata } from './src/utils/generateResourceFileWithMetadata'

async function main() {
	await generateResourceFileWithMetadata('https://www.youtube.com/watch?v=3XaXKiXtNjw')
}

main()

export default generateResourceFileWithMetadata
