# Resource Manager for resurse.dev

## Features

- Takes the meta from the given link and automatically generates a .md file in the appropriate format for resurse.dev



## Installation

```ts
- npm i https://github.com/pgabriel02/resource-importer
- import generateResourceFileWithMetadata from 'resource-importer';
- use generateResourceFileWithMetadata(url)
```

## What returns

```ts
import generateResourceFileWithMetadata from 'resource-importer';

generateResourceFileWithMetadata('https://www.youtube.com/watch?v=nzSsv9c_ynQ&t=7503s&ab_channel=ViorelMocanu')

```

### 🌟 title.md

![title.md](https://imgur.com/MztmT11.png)

### 🌟 image file

![image file](https://imgur.com/4UwRIae.png)
