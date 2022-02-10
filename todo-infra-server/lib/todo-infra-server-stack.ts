import * as cdk from "aws-cdk-lib";
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();
export class TodoInfraServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // == DynamoDB ==
    const todoTable = new dynamodb.Table(this, "TodoTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: "userId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    // == AppSync ==
    const todoApi = new appsync.GraphqlApi(this, "TodoGraphqlApi", {
      name: "todo-graphql-api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.OIDC,
          openIdConnectConfig: {
            oidcProvider: process.env.AUTH0_DOMAIN || "",
          },
        },
      },
    });

    // == Lambda function ==

    // common lambda props
    const commonLambdaNodeJsProps: Omit<
      lambdaNodeJs.NodejsFunctionProps,
      "entry"
    > = {
      handler: "handler",
      environment: {
        TODO_TABLE: todoTable.tableName,
      },
    };

    // GetTodos
    const getTodosLambda = new lambdaNodeJs.NodejsFunction(
      this,
      "getTodosHandler",
      {
        entry: "lambda/getTodos.ts",
        ...commonLambdaNodeJsProps,
      }
    );

    todoTable.grantReadData(getTodosLambda);

    // AddTodo
    const addTodoLambda = new lambdaNodeJs.NodejsFunction(
      this,
      "addTodoHandler",
      {
        entry: "lambda/addTodo.ts",
        ...commonLambdaNodeJsProps,
      }
    );

    todoTable.grantReadWriteData(addTodoLambda);

    // ToggleTodo
    const toggleTodoLambda = new lambdaNodeJs.NodejsFunction(
      this,
      "toggleTodoHandler",
      {
        entry: "lambda/toggleTodo.ts",
        ...commonLambdaNodeJsProps,
      }
    );

    todoTable.grantReadWriteData(toggleTodoLambda);

    // DeleteTodo
    const deleteTodoLambda = new lambdaNodeJs.NodejsFunction(
      this,
      "deleteTodoHandler",
      {
        entry: "lambda/deleteTodo.ts",
        ...commonLambdaNodeJsProps,
      }
    );

    todoTable.grantReadWriteData(deleteTodoLambda);

    // == AppSync DataSource ==

    // GetTodos
    const getTodosDataSource = todoApi.addLambdaDataSource(
      "getTodosDataSource",
      getTodosLambda
    );

    getTodosDataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    // AddTodo
    const addTodoDataSource = todoApi.addLambdaDataSource(
      "addTodoDataSource",
      addTodoLambda
    );

    addTodoDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    // ToggleTodo
    const toggleTodoDataSource = todoApi.addLambdaDataSource(
      "toggleTodoDataSource",
      toggleTodoLambda
    );

    toggleTodoDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "toggleTodo",
    });

    // DeleteTodo
    const deleteTodoDataSource = todoApi.addLambdaDataSource(
      "deleteTodoDataSource",
      deleteTodoLambda
    );

    deleteTodoDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    // == CfnOutput ==
    new cdk.CfnOutput(this, "GraphQlApiUrl", {
      value: todoApi.graphqlUrl,
    });
  }
}
