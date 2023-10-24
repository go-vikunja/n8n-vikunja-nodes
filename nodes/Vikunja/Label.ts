import {INodeProperties} from 'n8n-workflow'

export const labelProperties: INodeProperties[] = [
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
]
