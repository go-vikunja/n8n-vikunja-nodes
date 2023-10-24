import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VikunjaApi implements ICredentialType {
	name = 'vikunjaApi';
	displayName = 'Vikunja API';
	documentationUrl = 'https://vikunja.io/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			description: 'The full api url, complete with the /api/v1 suffix and WITHOUT trailing slash.',
			default: 'https://app.vikunja.cloud/api/v1',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}'
			}
		},
	};
}
