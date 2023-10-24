import {INodeProperties} from 'n8n-workflow'

export const teamProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a team',
				action: 'Create a team',
				routing: {
					request: {
						method: 'PUT',
						url: '=/teams',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a team',
				action: 'Delete a team',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/teams/{{$parameter.team}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a team',
				action: 'Get a team',
				routing: {
					request: {
						method: 'GET',
						url: '=/teams/{{$parameter.team}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many teams',
				action: 'Get many teams',
				routing: {
					request: {
						method: 'GET',
						url: '=/teams',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a team',
				action: 'Update a team',
				routing: {
					request: {
						method: 'POST',
						url: '=/teams/{{$parameter.team}}',
					},
				},
			},
			{
				name: 'Add a User',
				description: 'Add a user to a team',
				value: 'addUser',
				action: 'Add a user',
				routing: {
					request: {
						method: 'PUT',
						url: '=/teams/{{$parameter.team}}/members',
					},
				},
			},
			{
				name: 'Remove a User From a Team',
				value: 'removeUser',
				action: 'Remove a user',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/teams/{{$parameter.team}}/members/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Toggle a User\'s Admin Status in a Team',
				value: 'updateUser',
				action: 'Toggle admin status',
				routing: {
					request: {
						method: 'POST',
						url: '=/teams/{{$parameter.team}}/members/{{$parameter.userId}}',
					},
				},
			},
		],
		default: 'create',
	},
	{
		displayName: 'Team Name or ID',
		name: 'team',
		type: 'resourceLocator',
		default: {mode: 'id', value: ''},
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a team…',
				typeOptions: {
					searchListMethod: 'searchTeams',
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
				resource: ['team'],
				operation: ['get', 'update', 'delete', 'addUser', 'removeUser', 'updateUser'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'team_id',
			},
		},
		description: 'The team you want to operate on. Choose from the list, or specify an ID.',
	},
	{
		displayName: 'Team Name',
		name: 'teamName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
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
		description: 'A description for the team',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['team'],
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
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['removeUser'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'user_id',
			},
		},
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		default: '',
		description: 'The username of the user you want to add to the team',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addUser'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'username',
			},
		},
	},
	{
		displayName: 'Is Admin',
		name: 'isAdmin',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether or not the member is an admin of the team',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addUser'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'admin',
			},
		},
	},
]
