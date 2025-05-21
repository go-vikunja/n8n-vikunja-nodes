import {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { taskProperties } from './properties/Task';
import { projectProperties } from './properties/Project';
import { labelProperties } from './properties/Label';
import { searchAndMap } from './helper';
import { webhookProperties } from './properties/Webhook';
import { teamProperties } from './properties/Team';

export class Vikunja implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vikunja',
		name: 'vikunja',
		icon: 'file:vikunja.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: "Get data from Vikunja's API",
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
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'task',
			},

			...taskProperties,
			...projectProperties,
			...labelProperties,
			...webhookProperties,
			...teamProperties,
		],
	};

	methods = {
		listSearch: {
			async searchProjects(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/projects');
			},
			async searchLabels(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/labels');
			},
			async searchTeams(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				return searchAndMap(this, '/teams', 'name');
			},
			async searchProjectViews(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				const projectId = this.getNodeParameter('project', 0) as string | number | undefined;
				if (!projectId) {
					// If no project is selected, or project ID is empty, return an empty list.
					// n8n will typically show the placeholder text or "No options available".
					return { results: [] };
				}
				return searchAndMap(this, `/projects/${projectId}/views`);
			},
		},
	};
}
