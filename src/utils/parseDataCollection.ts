import _ from 'lodash'
import { elementsToBeEditedType } from './generateResourceFileWithMetadata';

function setDefaultItemValue(type: string | number | boolean) {
	switch(type) {
		case 'number': return 0;
		case 'boolean': return true;
		default: return "'@TODO'";
	}
}

function parseMetadataConfig(obj: Record<string, any>, elementsToBeEdited: elementsToBeEditedType): Record<string, any> {
	const keysToBeEdited = Object.keys(elementsToBeEdited)

	_.forOwn(obj, (value, key) => {
		if(_.isArray(value)) {
			console.log('e array', key)
			obj[key] = "\n\t- '@TODO'"
		} else if(_.isObject(value)) {
			obj[key] = getMetadataConfig(value, elementsToBeEdited)
		} else if(keysToBeEdited.includes(key)) {
			obj[key] = `'{{${elementsToBeEdited[key]}}}'`
		} else {
			obj[key] = setDefaultItemValue(typeof value)
		}
	});
	return obj;
}

export function getMetadataConfig(config: Record<string, any>, elementsToBeEdited: elementsToBeEditedType): Record<string, any> {
	if(Array.isArray(config)) {
		return config.map(obj => parseMetadataConfig(obj, elementsToBeEdited))
	}
	return parseMetadataConfig(config, elementsToBeEdited)
}

function getTabsString(count: number) {
	return '\t'.repeat(count)
}

export function generateMetaDataConfigAsString(config: Record<string, any>, initialCount: number = 0) {
	let stringToReturn = ''
	for(const item in config) {
		if(_.isObject(config[item])) {
			stringToReturn += `${item}:\n`
			stringToReturn += generateMetaDataConfigAsString(config[item], initialCount + 1)
		} else {
			stringToReturn += getTabsString(initialCount) + `${item}: ${config[item]}\n`
		}
	}
	return stringToReturn
}


export function generateConfig(config: Record<string, any>, elementsToBeEdited: elementsToBeEditedType = {}) {
	const metadataConfig = getMetadataConfig(config, elementsToBeEdited)
	const configAsString = generateMetaDataConfigAsString(metadataConfig)
	return `---\n${configAsString}---`
}
