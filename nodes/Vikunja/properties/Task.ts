import { INodeProperties } from 'n8n-workflow';
export const taskProperties: INodeProperties[] = [
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
				name: 'Add a Comment',
				description: 'Add a comment to a task',
				value: 'addComment',
				action: 'Add a comment',
				routing: {
					request: {
						method: 'PUT',
						url: '=/tasks/{{$parameter.taskId}}/comments',
					},
				},
			},
			{
				name: 'Add a Label',
				description: 'Add a label to a task',
				value: 'addLabel',
				action: 'Add a label',
				routing: {
					request: {
						method: 'PUT',
						url: '=/tasks/{{$parameter.taskId}}/labels',
					},
				},
			},
			{
				name: 'Add a Reaction',
				description: 'Add a reaction to a task or comment',
				value: 'addReaction',
				action: 'Add a reaction',
				routing: {
					request: {
						method: 'PUT',
						url: '=/{{$parameter.reactionKind}}/{{$parameter.reactionEntityID}}/reactions',
					},
				},
			},
			{
				name: 'Add a Relation',
				description: 'Add a relation to a task',
				value: 'addRelation',
				action: 'Add a relation',
				routing: {
					request: {
						method: 'PUT',
						url: '=/tasks/{{$parameter.taskId}}/relations',
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
				name: 'Create',
				value: 'create',
				description: 'Create a task',
				action: 'Create a task',
				routing: {
					request: {
						method: 'PUT',
						url: '=/projects/{{$parameter.taskProject}}/tasks',
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
				name: 'Delete a Comment',
				description: 'Delete an existing comment on a task',
				value: 'deleteComment',
				action: 'Delete a comment',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/comments/{{$parameter.commentId}}',
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
				name: 'Get All Comments',
				description: 'Fetch all comments on a task',
				value: 'getAllComments',
				action: 'Get all comments',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/comments',
					},
				},
			},
			{
				name: 'Get All Labels',
				description: 'Fetch all labels on a task',
				value: 'getAllLabelsOnTask',
				action: 'Get all labels',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/labels',
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
						url: '=/projects/{{$parameter.taskProject}}/tasks',
					},
				},
			},
			{
				name: 'Remove a Label From a Task',
				value: 'removeLabel',
				action: 'Remove a label',
				routing: {
					request: {
						method: 'DELETE',
						// FIX: Updated to use labelID instead of non-existent taskLabel
						url: '=/tasks/{{$parameter.taskId}}/labels/{{$parameter.labelID}}',
					},
				},
			},
			{
				name: 'Remove a Reaction',
				value: 'removeReaction',
				action: 'Remove a reaction',
				description: 'Remove a reaction from a task or comment',
				routing: {
					request: {
						method: 'POST',
						url: '=/{{$parameter.reactionKind}}/{{$parameter.reactionEntityID}}/reactions/delete',
					},
				},
			},
			{
				name: 'Remove a Relation',
				description: 'Remove an existing relation on a task',
				value: 'removeRelation',
				action: 'Remove a relation',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/relations/{{$parameter.relationKind}}/{{$parameter.otherTaskId}}',
					},
				},
			},
			{
				name: 'Remove an Assigned User From a Task',
				value: 'unassignUser',
				action: 'Unassign a user',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/assignees/{{$parameter.userId}}',
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
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}',
					},
				},
			},
			{
				name: 'Update a Comment',
				description: 'Update an existing comment on a task',
				value: 'updateComment',
				action: 'Update a comment',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/comments/{{$parameter.commentId}}',
					},
				},
			},
			{
				name: 'Update Task Position',
				description: 'Update the position of a task on a view',
				value: 'updateTaskPosition',
				action: 'Update the task position',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/position',
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
				operation: [
					'delete',
					'get',
					'update',
					'assignUser',
					'unassignUser',
					'addComment',
					'updateComment',
					'deleteComment',
					'getAllComments',
					'getAllLabelsOnTask',
					'addLabel',
					'removeLabel',
					'addRelation',
					'removeRelation',
					'updateTaskPosition',
				],
			},
		},
	},
	{
		displayName: 'Project Title or ID',
		name: 'taskProject',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
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
				resource: ['task'],
				operation: ['create', 'getAll', 'updateTaskPosition'],
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
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Bucket ID',
				name: 'bucketId',
				type: 'number',
				default: 0,
				description: 'The ID of the bucket you want to put this task into',
				routing: {
					send: {
						type: 'body',
						property: 'bucket_id',
					},
				},
			},
			{
				displayName: 'Cover Image Attachment ID',
				name: 'coverImageAttachmentID',
				type: 'number',
				default: 0,
				description: 'The ID of the attachment that is the cover image',
				routing: {
					send: {
						type: 'body',
						property: 'cover_image_attachment_id',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the task',
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
				displayName: 'Done',
				name: 'done',
				type: 'boolean',
				default: false,
				description: 'Whether this task is done',
				routing: {
					send: {
						type: 'body',
						property: 'done',
					},
				},
			},
			{
				displayName: 'Due Date Time',
				name: 'dueDateTime',
				type: 'string',
				default: '',
				description: 'Due date and time in ISO 8601 format with timezone (e.g., 2026-03-18T17:40:31-07:00). Use a Date/Time node to format the date/time value.',
				routing: {
					send: {
						type: 'body',
						property: 'due_date',
					},
				},
			},
			{
				displayName: 'End Date Time',
				name: 'endDateTime',
				type: 'string',
				default: '',
				description: 'End date and time in ISO 8601 format with timezone (e.g., 2026-03-18T17:40:31-07:00). Use a Date/Time node to format the date/time value.',
				routing: {
					send: {
						type: 'body',
						property: 'end_date',
					},
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
					},
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
					},
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
					},
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
					},
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
						name: 'Repeat From Current Date',
						description: 'Repeat from the current date rather than the last set date',
						value: 2,
					},
					{
						name: 'Repeat Monthly',
						description: 'Repeat all dates each months (ignoring repeat_after)',
						value: 1,
					},
				],
				default: 0,
				description:
					'How a repeating task will repeat itself. Will be triggered when a task is marked done.',
				routing: {
					send: {
						type: 'body',
						property: 'repeat_mode',
					},
				},
			},
			{
				displayName: 'Start Date Time',
				name: 'startDateTime',
				type: 'string',
				default: '',
				description: 'Start date and time in ISO 8601 format with timezone (e.g., 2026-03-18T17:40:31-07:00). Use a Date/Time node to format the date/time value.',
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
			},
			{
				displayName: 'Task Color',
				name: 'hexColor',
				type: 'color',
				default: '#000000',
				routing: {
					send: {
						type: 'body',
						property: 'hex_color',
					},
				},
			},
			{
				displayName: 'Task Identifier',
				name: 'taskIdentifier',
				type: 'string',
				default: '',
				description: "The task identifier, based on the project identifier and the task's index",
				routing: {
					send: {
						type: 'body',
						property: 'identifier',
					},
				},
			},
		],
	},
	{
		displayName: 'Additional Query Parameters',
		name: 'additionalQueryParameters',
		type: 'collection',
		placeholder: 'Add Query Parameter',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Subtasks', value: 'subtasks' },
					{ name: 'Buckets', value: 'buckets' },
					{ name: 'Reactions', value: 'reactions' },
					{ name: 'Comments', value: 'comments' },
				],
				routing: {
					send: {
						type: 'query',
						property: 'expand',
					},
				},
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'The filter query to match tasks by. Check out https://vikunja.io/docs/filters for a full explanation.',
				routing: {
					send: {
						type: 'query',
						property: 'filter',
					},
				},
			},
			{
				displayName: 'Filter Include Nulls',
				name: 'filterIncludeNulls',
				type: 'boolean',
				default: false,
				description: 'Whether set to true the result will include filtered fields whose value is set to `null`. Available values are `true` or `false`. Defaults to `false`.',
				routing: {
					send: {
						type: 'query',
						property: 'filter_include_nulls',
					},
				},
			},
			{
				displayName: 'Items Per Page',
				name: 'perPage',
				type: 'number',
				default: '',
				description: 'The maximum number of items per page. Note this parameter is limited by the configured maximum of items per page.',
				routing: {
					send: {
						type: 'query',
						property: 'per_page',
					},
				},
			},
			{
				displayName: 'Page Number',
				name: 'page',
				type: 'number',
				default: '',
				description: 'The page number. Used for pagination. If not provided, the first page of results is returned.',
				routing: {
					send: {
						type: 'query',
						property: 'page',
					},
				},
			},
			{
				displayName: 'Search Text',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search tasks by task text',
				routing: {
					send: {
						type: 'query',
						property: 's',
					},
				},
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				default: 'id',
				options: [
					{ name: 'Created', value: 'created' },
					{ name: 'Created By ID', value: 'created_by_id' },
					{ name: 'Description', value: 'description' },
					{ name: 'Done', value: 'done' },
					{ name: 'Done At', value: 'done_at' },
					{ name: 'Due Date', value: 'due_date' },
					{ name: 'End Date', value: 'end_date' },
					{ name: 'Hex Color', value: 'hex_color' },
					{ name: 'ID', value: 'id' },
					{ name: 'Percent Done', value: 'percent_done' },
					{ name: 'Priority', value: 'priority' },
					{ name: 'Project ID', value: 'project_id' },
					{ name: 'Repeat After', value: 'repeat_after' },
					{ name: 'Start Date', value: 'start_date' },
					{ name: 'Title', value: 'title' },
					{ name: 'UID', value: 'uid' },
					{ name: 'Updated', value: 'updated' },
				],
				description: 'Field to sort tasks by. Default is "ID".',
				routing: {
					send: {
						type: 'query',
						property: 'sort_by',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'orderBy',
				type: 'options',
				default: 'asc',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				description: 'Sort order. Default is "asc".',
				routing: {
					send: {
						type: 'query',
						property: 'order_by',
					},
				},
			},
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
			},
		},
	},
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateComment', 'deleteComment'],
			},
		},
	},
	{
		displayName: 'Comment Text',
		name: 'commentText',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment', 'updateComment'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Other Task ID',
		description: 'The ID of the other task you want to relate the current one with',
		name: 'otherTaskId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addRelation', 'removeRelation'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'other_task_id',
			},
		},
	},
	{
		displayName: 'Relation Kind',
		name: 'relationKind',
		type: 'options',
		options: [
			{
				name: 'Blocked By',
				value: 'blocked',
			},
			{
				name: 'Blocking',
				value: 'blocking',
			},
			{
				name: 'Copied From',
				value: 'copiedfrom',
			},
			{
				name: 'Copied To',
				value: 'copiedto',
			},
			{
				name: 'Duplicate Of',
				value: 'duplicateof',
			},
			{
				name: 'Duplicates',
				value: 'duplicates',
			},
			{
				name: 'Follows',
				value: 'follows',
			},
			{
				name: 'Parent Task',
				value: 'parenttask',
			},
			{
				name: 'Precedes',
				value: 'precedes',
			},
			{
				name: 'Related Task',
				value: 'related',
			},
			{
				name: 'Sub Task',
				value: 'subtask',
			},
		],
		default: 'related',
		description: 'The kind of relation between tasks',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addRelation', 'removeRelation'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'relation_kind',
			},
		},
	},
	{
		displayName: 'Project View ID',
		name: 'view',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a project view...',
				typeOptions: {
					searchListMethod: 'searchProjectViews',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Project View ID',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'view_id',
			},
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateTaskPosition'],
			},
		},
		description: 'The project view you want to operate on',
	},
	{
		displayName: 'Task Position',
		name: 'taskPosition',
		type: 'number',
		description: 'A numeric value used to determine the position of this task',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateTaskPosition'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'position',
			},
		},
		default: 0,
	},
	{
		displayName: 'Task or Comment ID',
		description: 'The ID of the task or comment you want to react on',
		name: 'reactionEntityID',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addReaction', 'removeReaction'],
			},
		},
	},
	{
		displayName: 'Reaction Kind',
		name: 'reactionKind',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Task',
				value: 'tasks',
			},
			{
				name: 'Comment',
				value: 'comments',
			},
		],
		default: 'tasks',
		description: 'The entity you want to react on',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addReaction', 'removeReaction'],
			},
		},
	},
	{
		displayName: 'Reaction',
		name: 'reactionValue',
		type: 'string',
		description:
			'The actual reaction value. Usually you want to use an emoji here, but this can be any valid utf character or text, up to a length of 20.',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addReaction', 'removeReaction'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'value',
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Label ID',
		description: 'The ID of the label you want to add or remove',
		name: 'labelID',
		type: 'number',
		default: '',
		required: true,
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
	},
];
