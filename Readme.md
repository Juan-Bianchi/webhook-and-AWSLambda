# Webhooks tester

## General overview

This repository was created to test webhooks generated in Linear. After creating a webhook in Linear (you need to configure which events will trigger the webhook request), when events occur, an AWS Lambda function is invoked, sending a request to this backend.

Depending on the entity sent in the payload of the Linear webhook request, a personalized message will be created and sent to Discord, displaying it in a chosen channel.

## Steps
1. I created an AWS Lambda Function designed to resend Linear payloads to this backend. To enable consumption, I generated a public URL for the Lambda Function. It is crucial to create a URL for the Lambda Function to ensure accessibility.
2. The next step involved setting up a webhook within Linear. Initially, I configured the webhook to utilize the URL of the Lambda Function, allowing the webhook to send requests. After that, I specified the events that would trigger the webhook request. For a comprehensive guide on creating a webhook in Linear, please refer to the Linear Documentation: [Webhooks Guide](https://developers.linear.app/docs/graphql/webhooks)
3. Additionally, I implemented this backend, responsible for generating the message that will be sent and shown in Discord. Depending on the entity that is being modified, a personalized message will be generated to show its details.

## Linear webhooks payload

I will attach some screenshots of an 'issue' payload sent by Linear to have a reference in case you work with Linear webhooks in the future. Please, notice that payload structure will **depend on the entity type modified** (the object inside 'data' property will differ).

![IssueEntity](https://github.com/Juan-Bianchi/webhook-and-AWSLambda/assets/104390122/804485e4-e4c2-46a9-8bc2-e60498e5d384)

![IssueEntity2](https://github.com/Juan-Bianchi/webhook-and-AWSLambda/assets/104390122/674d139f-7fdb-4006-b799-6c145a16af18)

1. action: Describes the specific action that triggered the webhook. Examples include 'create,' 'update,' 'remove,' etc.
2. createdAt: Indicates the date and time when the entity was last modified.
3. asignee: This property is present only if the issue has been assigned to a team member. An issue can only have one assignee.
4. state: Provides information about the current state of the issue. The 'name' property within this object indicates the current status of the issue.
5. team: Offers details about the assigned work team.
6. suscribersId: An array containing the IDs of users assigned to assist the assignee in completing the issue.
7. type: Specifies the type of entity being modified.