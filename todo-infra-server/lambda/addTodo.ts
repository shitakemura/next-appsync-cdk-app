import { AppSyncResolverHandler } from "aws-lambda";
import {
  AddTodoInput,
  MutationAddTodoArgs,
  Todo,
} from "../graphql/generated/generated-types";
import { DynamoDB } from "aws-sdk";
import { extractJwtSubject } from "./utils/extractJwtSubject";
import { v4 } from "uuid";

const docClient = new DynamoDB.DocumentClient();

export const handler: AppSyncResolverHandler<
  MutationAddTodoArgs,
  AddTodoInput | null
> = async (event) => {
  const sub = extractJwtSubject(event.request.headers);
  const addTodoInput = event.arguments.addTodoInput;
  const uuid = v4();

  try {
    if (!process.env.TODO_TABLE) {
      console.log("TODO_TABLE was not specified");
      return null;
    }

    const newTodo: Todo = {
      userId: sub,
      id: uuid,
      ...addTodoInput,
      completed: false,
      createdAt: Date.now(),
    };

    await docClient
      .put({
        TableName: process.env.TODO_TABLE,
        Item: newTodo,
      })
      .promise();
    return newTodo;
  } catch (err) {
    console.error(`[Error] DynamoDB error: ${err}`);
    return null;
  }
};
