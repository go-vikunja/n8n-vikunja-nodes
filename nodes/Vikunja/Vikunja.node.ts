import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription, JsonObject,
	NodeApiError,
} from 'n8n-workflow'
import {OptionsWithUri} from 'request'

import {taskProperties} from './Task'
import {projectProperties} from './Project'
import {labelProperties} from './Label'

export class Vikunja implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vikunja',
		name: 'Vikunja',
		icon: 'file:vikunja.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Vikunja\'s API',
		defaults: {
			name: 'Vikunja',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'vikunjaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiUrl.replace(new RegExp("/$"), "")}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Project',
						value: 'project',
					},
				],
				default: 'task',
			},

			...taskProperties,
			...projectProperties,
			...labelProperties,
		],
	}

	methods = {
		listSearch: {
			async searchProjects(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {

				const credentialType = 'vikunjaApi'
				const cred = await this.getCredentials(credentialType)

				const options: OptionsWithUri = {
					method: 'GET',
					uri: `${cred.apiUrl}/projects`,
					json: true,
				}

				try {
					const projects = await this.helpers.requestWithAuthentication.call(this, credentialType, options)
					return {
						results: projects.map((project: IDataObject) => ({
							name: project.title,
							value: project.id,
						})),
					}
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject)
				}
			},
			async searchLabels(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {

				const credentialType = 'vikunjaApi'
				const cred = await this.getCredentials(credentialType)

				const options: OptionsWithUri = {
					method: 'GET',
					uri: `${cred.apiUrl}/labels`,
					json: true,
				}

				try {
					const labels = await this.helpers.requestWithAuthentication.call(this, credentialType, options)
					return {
						results: labels.map((project: IDataObject) => ({
							name: project.title,
							value: project.id,
						})),
					}
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject)
				}
			},
		},
	}
}
