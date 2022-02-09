import { AppSyncResolverHandler } from "aws-lambda";
import {
  MutationToggleTodoArgs,
  Todo,
} from "../graphql/generated/generated-types";
import { DynamoDB } from "aws-sdk";
import { extractJwtSubject } from "./utils/extractJwtSubject";

const docClient = new DynamoDB.DocumentClient();

export const handler: AppSyncResolverHandler<
  MutationToggleTodoArgs,
  Todo | null
> = async (event) => {
  const sub = extractJwtSubject(event.request.headers);
  const toggleTodoInput = event.arguments.toggleTodoInput;

  try {
    if (!process.env.TODO_TABLE) {
      console.log("TODO_TABLE was not specified");
      return null;
    }

    const data = await docClient
      .update({
        TableName: process.env.TODO_TABLE,
        Key: {
          userId: sub,
          id: toggleTodoInput.id,
        },
        UpdateExpression: "set completed = :c",
        ExpressionAttributeValues: {
          ":c": toggleTodoInput.completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return data.Attributes as Todo;
  } catch (err) {
    console.error(`[Error] DynamoDB error: ${err}`);
    return null;
  }
};
