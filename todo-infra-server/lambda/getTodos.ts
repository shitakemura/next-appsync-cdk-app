import { AppSyncResolverHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { Todo } from "../graphql/generated/generated-types";
import { extractJwtSubject } from "./utils/extractJwtSubject";

const docClient = new DynamoDB.DocumentClient();

export const handler: AppSyncResolverHandler<null, Todo[] | null> = async (
  event
) => {
  const sub = extractJwtSubject(event.request.headers);

  try {
    if (!process.env.TODO_TABLE) {
      console.log("TODO_TABLE was not specified");
      return null;
    }

    const data = await docClient
      .query({
        TableName: process.env.TODO_TABLE,
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
          ":u": sub,
        },
      })
      .promise();
    return data.Items as Todo[];
  } catch (err) {
    console.error(`[Error] DynamoDB error: ${err}`);
    return null;
  }
};
