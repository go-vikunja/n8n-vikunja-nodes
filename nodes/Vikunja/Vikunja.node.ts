import {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow'

import {taskProperties} from './Task'
import {projectProperties} from './Project'
import {labelProperties} from './Label'
import {searchAndMap} from './helper'

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
			searchProjects(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/projects')
			},
			async searchLabels(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/labels')
			},
			async searchTeams(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/teams')
			},
		},
	}
}
