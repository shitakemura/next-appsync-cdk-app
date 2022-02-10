# Todo - infra-server

Todo app infrasturcture & backend built with AWS CDK

## Stacks

- TodoClientDeploymentStack (AWS CloudFront - S3)
- TodoInfraServerStack: (AWS AppSync - lambda - DynamoDB)

## .env file

```
AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN"
```

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
