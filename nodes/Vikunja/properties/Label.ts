import {INodeProperties} from 'n8n-workflow'

export const labelProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a label',
				action: 'Create a label',
				routing: {
					request: {
						method: 'PUT',
						url: '=/labels',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a label',
				action: 'Delete a label',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/labels/{{$parameter.label}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a label',
				action: 'Get a label',
				routing: {
					request: {
						method: 'GET',
						url: '=/labels/{{$parameter.label}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many labels',
				action: 'Get many labels',
				routing: {
					request: {
						method: 'GET',
						url: '=/labels',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a label',
				action: 'Update a label',
				routing: {
					request: {
						method: 'POST',
						url: '=/labels/{{$parameter.label}}',
					},
				},
			},
		],
		default: 'create',
	},
	{
		displayName: 'Label Title or ID',
		name: 'label',
		type: 'resourceLocator',
		default: {mode: 'id', value: ''},
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a label…',
				typeOptions: {
					searchListMethod: 'searchLabels',
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
				resource: ['label'],
				operation: ['get', 'update', 'delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'label_id',
			},
		},
		description: 'The label you want to operate on. Choose from the list, or specify an ID.',
	},
	{
		displayName: 'Label Title or ID',
		name: 'taskLabel',
		type: 'resourceLocator',
		default: {mode: 'id', value: ''},
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a label…',
				typeOptions: {
					searchListMethod: 'searchLabels',
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
				operation: ['addLabel', 'removeLabel'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'label_id',
			},
		},
		description: 'The label you want to operate on. Choose from the list, or specify an ID.',
	},
	{
		displayName: 'Label Title',
		name: 'labelTitle',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['label'],
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
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'A description for the label',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
	},
	{
		displayName: 'Label Color',
		name: 'hexColor',
		type: 'color',
		default: '#000000',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'hex_color',
			},
		},
	},
]
