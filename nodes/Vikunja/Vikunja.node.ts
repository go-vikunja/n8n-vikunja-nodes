import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription, JsonObject,
	NodeApiError,
} from 'n8n-workflow'
import {OptionsWithUri} from 'request'

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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				required: true,
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new task',
						action: 'Create a task',
						routing: {
							request: {
								method: 'PUT',
								url: '=/projects/{{$parameter.project}}/tasks',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a task',
						action: 'Delete a task',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/tasks/{{$parameter.taskId}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a task',
						action: 'Get a task',
						routing: {
							request: {
								method: 'GET',
								url: '=/tasks/{{$parameter.taskId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many tasks',
						action: 'Get many tasks',
						routing: {
							request: {
								method: 'GET',
								url: '=/projects/{{$parameter.project}}/tasks',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a task',
						action: 'Update a task',
						routing: {
							request: {
								method: 'GET',
								url: '=/tasks/{{$parameter.taskId}}',
							},
						},
					},
					{
						name: 'Assign a User to a Task',
						value: 'assignUser',
						action: 'Assign a user',
						routing: {
							request: {
								method: 'PUT',
								url: '=/tasks/{{$parameter.taskId}}/assignees',
							},
						},
					},
					{
						name: 'Remove an Assigned User from a Task',
						value: 'unassignUser',
						action: 'Unassign a user',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/tasks/{{$parameter.taskId}}/assignees/{{$parameter.userId}}',
							},
						},
					},
				],
				default: 'create',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'number',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['delete', 'get', 'update', 'assignUser', 'unassignUser'],
					},
				},
			},
			{
				displayName: 'Project Name or ID',
				name: 'project',
				type: 'resourceLocator',
				default: {mode: 'id', value: ''},
				required: true,
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a project...',
						typeOptions: {
							searchListMethod: 'searchProjects',
							searchable: true,
						},
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						placeholder: '1567890',
					},
				],
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['create', 'getAll'],
					},
				},
				description: 'The project you want to operate on. Choose from the list, or specify an ID.',
			},
			{
				displayName: 'Task Title',
				name: 'taskTitle',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['create', 'update'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'title',
					}
				},
				default: '',
				required: true,
			},
			{
				displayName: 'Additional Fields',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'A description for the task',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							}
						},
					},
					{
						displayName: 'Done',
						name: 'done',
						type: 'boolean',
						default: false,
						description: 'Whether this task is done',
						routing: {
							send: {
								type: 'body',
								property: 'done',
							}
						},
					},
					{
						displayName: 'Due Date Time',
						name: 'dueDateTime',
						type: 'dateTime',
						default: '',
						description: 'Specific date and time in RFC3339 format',
						routing: {
							send: {
								type: 'body',
								property: 'due_date',
							}
						},
					},
					{
						displayName: 'Start Date Time',
						name: 'startDateTime',
						type: 'dateTime',
						default: '',
						description: 'Specific date and time in RFC3339 format',
						routing: {
							send: {
								type: 'body',
								property: 'start_date',
							}
						},
					},
					{
						displayName: 'End Date Time',
						name: 'endDateTime',
						type: 'dateTime',
						default: '',
						description: 'Specific date and time in RFC3339 format',
						routing: {
							send: {
								type: 'body',
								property: 'end_date',
							}
						},
					},
					{
						displayName: 'Task Color',
						name: 'hexColor',
						type: 'color',
						default: 'hex_color',
						routing: {
							send: {
								type: 'body',
								property: 'hex_color',
							}
						},
					},
					{
						displayName: 'Favorite',
						name: 'isFavorite',
						type: 'boolean',
						default: false,
						description: 'Whether this task is set as a favorite task',
						routing: {
							send: {
								type: 'body',
								property: 'is_favorite',
							}
						},
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'number',
						typeOptions: {
							maxValue: 5,
							minValue: 1,
						},
						default: 1,
						description: 'Task priority from 1 (normal) to 5 (DO NOW)',
						routing: {
							send: {
								type: 'body',
								property: 'priority',
							}
						},
					},
					{
						displayName: 'Percent Done',
						name: 'percentDone',
						type: 'number',
						typeOptions: {
							maxValue: 1,
							minValue: 0,
						},
						default: 0,
						description: 'The progress of the task in percent',
						routing: {
							send: {
								type: 'body',
								property: 'percent_done',
							}
						},
					},
					{
						displayName: 'Repeat After',
						name: 'repeatAfter',
						type: 'number',
						default: 0,
						description: 'The amount in seconds after this task will repeat',
						routing: {
							send: {
								type: 'body',
								property: 'repeat_after',
							}
						},
					},
					{
						displayName: 'Repeat Mode',
						name: 'repeatMode',
						type: 'options',
						options: [
							{
								name: 'Repeat After Amount',
								description: 'Repeat after the amount specified in repeat_after',
								value: 0,
							},
							{
								name: 'Repeat Monthly',
								description: 'Repeat all dates each months (ignoring repeat_after)',
								value: 1,
							},
							{
								name: 'Repeat From Current Date',
								description: 'Repeat from the current date rather than the last set date',
								value: 2,
							},
						],
						default: 0,
						description: 'How a repeating task will repeat itself. Will be triggered when a task is marked done.',
						routing: {
							send: {
								type: 'body',
								property: 'repeat_mode',
							}
						},
					},

					// Reminders
				],
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['assignUser', 'unassignUser'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'user_id',
					}
				},
			},
			// More
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
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			},
		}
	}
}
