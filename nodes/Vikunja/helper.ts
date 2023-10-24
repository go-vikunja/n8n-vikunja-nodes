import {OptionsWithUri} from 'request'
import {IDataObject, ILoadOptionsFunctions, INodeListSearchResult, JsonObject, NodeApiError} from 'n8n-workflow'

export async function searchAndMap(context: ILoadOptionsFunctions, url: string): Promise<INodeListSearchResult> {
	const credentialType = 'vikunjaApi'
	const cred = await context.getCredentials(credentialType)

	const options: OptionsWithUri = {
		method: 'GET',
		uri: cred.apiUrl + url,
		json: true,
	}

	try {
		const items = await context.helpers.requestWithAuthentication.call(context, credentialType, options)
		return {
			results: items.map((project: IDataObject) => ({
				name: project.title,
				value: project.id,
			})),
		}
	} catch (error) {
		throw new NodeApiError(context.getNode(), error as JsonObject)
	}
}
