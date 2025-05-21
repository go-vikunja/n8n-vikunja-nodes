import {
	IDataObject,
	IHookFunctions,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	JsonObject,
	NodeApiError,
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';

export async function searchAndMap(
	context: ILoadOptionsFunctions,
	url: string,
	titleProperty: string = 'title',
): Promise<INodeListSearchResult> {
	try {
		const items = await apiRequest.call(context, 'GET', url);
		return {
			results: items.map((item: IDataObject) => ({
				name: item[titleProperty],
				value: item.id,
			})),
		};
	} catch (error) {
		throw new NodeApiError(context.getNode(), error as JsonObject);
	}
}

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: object,
	query?: IDataObject,
): Promise<any> {
	query = query || {};
	body = body || {};

	const credentialType = 'vikunjaApi';
	const { apiUrl } = await this.getCredentials(credentialType);

	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: apiUrl + endpoint,
		json: true,
	};

	return this.helpers.requestWithAuthentication.call(this, credentialType, options);
}
