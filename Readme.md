# Webhooks tester

## General overview

This repository was created to test webhooks generated in Linear. After creating a webhook in Linear (you need to configure which events will trigger the webhook request), when events occur, an AWS Lambda function is invoked, sending a request to this backend.

Depending on the entity sent in the payload of the Linear webhook request, a personalized message will be created and sent to Discord, displaying it in a chosen channel.

## Steps
1. Created an AWS Lambda Function to re-send Linear payload to this backend. Created a public url so Lambda Function can be consumed. 
2. Created a webhook in Linear. First, I set Lambda Function's url so webhook can send the request and then configured which events would trigger the webhook request.
3. Created this backend, which is responsible for generating the message that will be sent and shown in Discord. Depending on the entity that is being modified, a personalized message will be generated to show its details.

## Linear webhooks payload

I will attach some screenshots of issue payload sent by Linear to have a reference in case you work with Linear webhooks in the future (Please, take into account that payload will depend on the entity type modified).

![IssueEntity](https://github.com/Juan-Bianchi/webhook-and-AWSLambda/assets/104390122/804485e4-e4c2-46a9-8bc2-e60498e5d384)

![IssueEntity2](https://github.com/Juan-Bianchi/webhook-and-AWSLambda/assets/104390122/674d139f-7fdb-4006-b799-6c145a16af18)

1- action: It describes the action that triggered the webhook. E.g: 'create', 'update', 'remove', etc.
2- createdAt: It shows date and time when the entity was modified.
3- asignee: This property will be present only if the Issue has been assigned to a Team member. Only one person can be the asignee of an issue.
4- state: It gives information about the state of the issue. This object has a property called name that informs the state.
5- team: It provides details about the work team.
6- suscribersId: An array that contains IDs of user assigned to help the asignee to finish the Issue.
7- type: It informs the entity that is being modified.







