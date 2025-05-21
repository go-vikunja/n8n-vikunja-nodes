# n8n-nodes-vikunja

This is an n8n community node. It lets you use Vikunja in your n8n workflows.

Vikunja is an open-source, self-hostable to-do and productivity application.
Check out [our website](https://vikunja.io/) for more information.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

* [Installation](#installation)  
* [Operations](#operations)  
* [Credentials](#credentials)
* [Compatibility](#compatibility)  
* [Development](#development)
* [Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports all operations supported by Vikunja API tokens.
You can see a full list of possible actions when creating a token in Vikunja.

It also allows you to trigger n8n workflows by Vikunja webhooks.

## Credentials

The only supported authentication method for this node are API tokens.
On your Vikunja instance, head over to *Settings > API Tokens* and create a new token.

In n8n, create credentials as you usually would.
Enter the API token created previously and the API url.

## Compatibility

Tested with n8n Version 1.91.3.

## Development

You need npm and NodeJS installed.

* Install dependencies with `npm i`
* Build the node with `npm run build`
* Check for lint errors with `npm run lint` and fix them with `npm run lintfix`
* To release a new version in the npm registry, run `npm publish`
* To test the node, build the node with `npm run build`, then while in the project directory run `export N8N_CUSTOM_EXTENSIONS=$PWD` and start n8n with the `n8n` command. You should now be able to find the node when searching for it.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Vikunja n8n Docs](https://vikunja.io/docs/n8n)
* [Vikunja General Docs](https://vikunja.io/docs/)
