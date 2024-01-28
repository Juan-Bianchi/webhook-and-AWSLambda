# Webhooks tester

## General overview

This repository was created to test webhooks generated in Linear. After creating a webhook in Linear (you need to configure which events will trigger the webhook request), when events occur, an AWS Lambda function is invoked, sending a request to this backend.

Depending on the entity sent in the payload of the Linear webhook request, a personalized message will be created and sent to Discord, displaying it in a chosen channel.

## Steps
1. Created an AWS Lambda Function to re-send Linear payload to this backend. Created a public url so Lambda Function can be consumed. 
2. Created a webhook in Linear. First, I set Lambda Function's url so webhook can send the request and then configured which events would trigger the webhook request.
3. Created this backend, which is responsible for generating the message that will be sent and shown in Discord. Depending on the entity that is being modified, a personalized message will be generated to show its details.

## Linear webhooks payload

I will attach some screenshots of two different payload to have a reference in case you work with Linear webhooks in the future (Please, take into account that payload will depend on the entity type modified).

![IssuePayload1](https://github.com/Juan-Bianchi/webhook-and-AWSLambda/assets/104390122/8ee5a752-a33b-4bfe-8ef1-bbced1d470ee)




