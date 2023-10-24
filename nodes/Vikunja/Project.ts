import {INodeProperties} from 'n8n-workflow'

export const projectProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a project',
				action: 'Create a project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/projects',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a project',
				action: 'Delete a project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/projects/{{$parameter.project}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a project',
				action: 'Get a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/projects/{{$parameter.project}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many projects',
				action: 'Get many projects',
				routing: {
					request: {
						method: 'GET',
						url: '=/projects',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a project',
				action: 'Update a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/projects/{{$parameter.project}}',
					},
				},
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a project',
				action: 'Duplicate a project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/projects/{{$parameter.project}}/duplicate',
					},
				},
			},
		],
		default: 'create',
	},
	{
		displayName: 'Project Title or ID',
		name: 'project',
		type: 'resourceLocator',
		default: {mode: 'id', value: ''},
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a project…',
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
				resource: ['project'],
				operation: ['get', 'delete', 'update', 'duplicate'],
			},
		},
		description: 'The project you want to operate on. Choose from the list, or specify an ID.',
	},
	{
		displayName: 'Parent Project Title or ID',
		name: 'parentProject',
		type: 'resourceLocator',
		default: {mode: 'id', value: ''},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a project…',
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
				resource: ['project'],
				operation: ['create', 'duplicate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'parent_project_id',
			},
		},
		description: 'The parent project you want to use. Choose from the list, or specify an ID.',
	},
	{
		displayName: 'Project Title',
		name: 'projectTitle',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
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
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the project',
				typeOptions: {
					rows: 4,
				},
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Project Color',
				name: 'hexColor',
				type: 'color',
				default: 'hex_color',
				routing: {
					send: {
						type: 'body',
						property: 'hex_color',
					},
				},
			},
			{
				displayName: 'Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				description: 'Whether a project is archived',
				routing: {
					send: {
						type: 'body',
						property: 'is_archived',
					},
				},
			},
			{
				displayName: 'Favorite',
				name: 'isFavorite',
				type: 'boolean',
				default: false,
				description: 'Whether this project is set as a favorite',
				routing: {
					send: {
						type: 'body',
						property: 'is_favorite',
					},
				},
			},
			{
				displayName: 'Default Bucket ID',
				name: 'defaultBucketId',
				type: 'number',
				default: 0,
				description: 'The ID of the bucket where new tasks without a bucket are added to. By default, this is the leftmost bucket in a project.',
				routing: {
					send: {
						type: 'body',
						property: 'default_bucket_id',
					},
				},
			},
			{
				displayName: 'Done Bucket ID',
				name: 'doneBucketId',
				type: 'number',
				default: 0,
				description: 'If tasks are moved to the done bucket, they are marked as done. If they are marked as done individually, they are moved into the done bucket.',
				routing: {
					send: {
						type: 'body',
						property: 'done_bucket_id',
					},
				},
			},
			{
				displayName: 'Identifier',
				name: 'identifier',
				type: 'string',
				default: '',
				description: 'The unique project short identifier. Used to build task identifiers.',
				routing: {
					send: {
						type: 'body',
						property: 'identifier',
					},
				},
			},
		],
	},
]
