import path from 'path'

export const markdownDestination = path.join(process.cwd(), 'src', 'content', 'resources')

export const commonMarkdownInfo = `---
title: "renametitle",
url: "renameurl",
language: "en"
modDate: "05 October 2011 14:48 UTC"
addDate: "${new Date().toLocaleString('en-EN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}"
description: "renamedescription"
authorName: "@TODO"
authorURL: "@TODO",
section: "@TODO"
categories:
- "@TODO"
rating: 100,
price: 0,
requiredTime: 0.1,
type: "renametype",
mandatory: false,
image:
	imageUrl: "renamebanner"
	imageAlt: "renametitle"
tags:
- "@TODO"
---`
