import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
	NodeConnectionType,
} from 'n8n-workflow';
import { apiRequest } from './helper';
import { availableWebhookEvents } from './properties/Webhook';

export class VikunjaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vikunja Trigger',
		name: 'vikunjaTrigger',
		icon: 'file:vikunja.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when Vikunja events occur',
		defaults: {
			name: 'Vikunja Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'vikunjaApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'number',
				required: true,
				default: 0,
				description: 'The project you want to operate on. Choose from the list, or specify an ID.',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				default: [],
				description: 'The webhook events which should fire this webhook target',
				options: availableWebhookEvents,
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Check all the webhooks which exist already if it is identical to the
				// one that is supposed to get created.
				const projectId = this.getNodeParameter('project') as number;
				const endpoint = `/projects/${projectId}/webhooks`;

				const responseData = await apiRequest.call(this, 'GET', endpoint);

				const webhookUrl = this.getNodeWebhookUrl('default');

				for (const webhook of responseData) {
					if (webhook.target_url === webhookUrl) {
						// Set webhook-id to be sure that it can be deleted
						const webhookData = this.getWorkflowStaticData('node');
						webhookData.webhookId = webhook.id as number;
						return true;
					}
				}

				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const projectId = this.getNodeParameter('project') as number;
				const endpoint = `/projects/${projectId}/webhooks`;

				const body = {
					target_url: webhookUrl,
					events: this.getNodeParameter('events') as string[],
				};

				const responseData = await apiRequest.call(this, 'PUT', endpoint, body);

				if (responseData.id === undefined) {
					// Required data is missing so was not successful
					return false;
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					const projectId = this.getNodeParameter('project') as number;
					const endpoint = `/projects/${projectId}/webhooks/${webhookData.webhookId}`;

					try {
						await apiRequest.call(this, 'DELETE', endpoint);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const webhookName = this.getWebhookName();

		if (webhookName === 'setup') {
			// Is a create webhook confirmation request
			const res = this.getResponseObject();
			res.status(200).end();
			return {
				noWebhookResponse: true,
			};
		}

		const bodyData = this.getBodyData();

		// TODO: Check why that does not work as expected even though it gets done as described

		//const credentials = await this.getCredentials('vikunjaApi');
		// // Check if the request is valid
		// const headerData = this.getHeaderData() as IDataObject;
		// const webhookUrl = this.getNodeWebhookUrl('default');
		// const checkContent = JSON.stringify(bodyData) + webhookUrl;
		// const computedSignature = createHmac('sha1', credentials.oauthSecret as string).update(checkContent).digest('base64');
		// if (headerData['x-vikunja-webhook'] !== computedSignature) {
		// 	// Signature is not valid so ignore call
		// 	return {};
		// }

		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}
