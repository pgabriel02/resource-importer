import _ from 'lodash'
import { elementsToBeEditedType } from './generateResourceFileWithMetadata';

function setDefaultItemValue(type: 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'undefined' | 'object' | 'function') {
	switch(type) {
		case 'number': return 0;
		case 'boolean': return true;
		case 'string': return "'@TODO'";
		default: throw new Error(`Type ${type} not supported`)
	}
}

function parseMetadataConfig(obj: Record<string, any>, elementsToBeEdited: elementsToBeEditedType, tabCount: number): Record<string, any> {
	const keysToBeEdited = Object.keys(elementsToBeEdited)
	const tabs = getTabsString(tabCount)
	_.forOwn(obj, (value, key) => {
		if(_.isArray(value)) {
			obj[key] = `\n${tabs}- '@TODO'`
		} else if(_.isObject(value)) {
			if(_.has(value, 'slug') && _.has(value, 'collection')) {
				obj[key] = `'@TODO'`
			} else {
				obj[key] = getMetadataConfig(value, elementsToBeEdited, tabCount + 1)
			}
		} else if(keysToBeEdited.includes(key)) {
			obj[key] = `'{{${elementsToBeEdited[key]}}}'`
		} else {
			obj[key] = setDefaultItemValue(typeof value)
		}
	});
	return obj;
}

export function getMetadataConfig(config: Record<string, any>, elementsToBeEdited: elementsToBeEditedType, tabCount: number = 1): Record<string, any> {
	if(_.isArray(config)) {
		return config.map(obj => parseMetadataConfig(obj, elementsToBeEdited, tabCount))
	}
	return parseMetadataConfig(config, elementsToBeEdited, tabCount)
}

function getTabsString(count: number) {
	return '\t'.repeat(count)
}

export function generateMetaDataConfigAsString(config: Record<string, any>, tabCount: number = 0) {
	let stringToReturn = ''
	const tabs = getTabsString(tabCount)
	for(const item in config) {
		if(_.isObject(config[item])) {
			stringToReturn += tabs + `${item}:\n`
			stringToReturn += generateMetaDataConfigAsString(config[item], tabCount + 1)
		} else {
			stringToReturn += tabs + `${item}: ${config[item]}\n`
		}
	}
	return stringToReturn
}


export function generateConfig(config: Record<string, any>, elementsToBeEdited: elementsToBeEditedType = {}) {
	const metadataConfig = getMetadataConfig(config, elementsToBeEdited)
	const configAsString = generateMetaDataConfigAsString(metadataConfig)
	return `---\n${configAsString}---`
}
