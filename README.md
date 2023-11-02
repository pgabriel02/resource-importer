# Astro Resource Manager for Resurse.dev

## Features

-   Takes the meta from the link parameter and automatically generates an `.md` content file in the appropriate [format](https://github.com/ViorelMocanu/digital-resources/blob/main/src/content/config.ts) for [Resurse.dev](https://resurse.dev/).

## Installation

```bash
npm i https://github.com/pgabriel02/resource-importer
```

Then import the helper function in your project:

```typescript
import generateResourceFileWithMetadata from 'resource-importer'
```

Then use it when appropriate:

```typescript
use await generateResourceFileWithMetadata(url);
```

## Example
### Example function

```ts
import { getCollection } from 'astro:content'
import { generateResourceFileWithMetadata } from 'resource-importer'

async function test() {
	const config = await getCollection('resources')
	await generateResourceFileWithMetadata({
		url: 'https://www.youtube.com/watch?v=nm2wIUr5KNk',
		contentKey: 'resources',
		configData: config,
		elementsToBeEdited: {
			title: 'title',
			url: 'url',
			imageUrl: 'banner',
			imageAlt: 'title'
		}
	})
}
test()
```

```typescript
import generateResourceFileWithMetadata from 'resource-importer'

await generateResourceFileWithMetadata('https://www.youtube.com/watch?v=nzSsv9c_ynQ&t=7503s&ab_channel=ViorelMocanu')
```

Will output these files:

### 🌟 title.md

![title.md](https://imgur.com/MztmT11.png)

### 🌟 image file

![image file](https://imgur.com/4UwRIae.png)
