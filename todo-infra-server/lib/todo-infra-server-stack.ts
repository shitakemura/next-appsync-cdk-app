import * as cdk from "aws-cdk-lib";
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";

export class TodoInfraServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const todoTable = new dynamodb.Table(this, "TodoTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    // AppSync
    const todoApi = new appsync.GraphqlApi(this, "TodoGraphqlApi", {
      name: "todo-graphql-api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
    });

    // Lambda function
    const getTodosLambda = new lambdaNodeJs.NodejsFunction(
      this,
      "getBooksHandler",
      {
        entry: "lambda/getTodos.ts",
        handler: "handler",
        environment: {
          TODO_TABLE: todoTable.tableName,
        },
      }
    );

    todoTable.grantReadData(getTodosLambda);

    // AppSync DataSource
    const getTodosDataSource = todoApi.addLambdaDataSource(
      "getTodosDataSource",
      getTodosLambda
    );

    getTodosDataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    // CfnOutput
    new cdk.CfnOutput(this, "GraphQlApiUrl", {
      value: todoApi.graphqlUrl,
    });

    new cdk.CfnOutput(this, "GraphQlApiKey", {
      value: todoApi.apiKey || "",
    });
  }
}
