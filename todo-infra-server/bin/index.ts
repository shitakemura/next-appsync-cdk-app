#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoClientDeploymentStack } from "../lib/todo-client-deployment-stack";
import { TodoInfraServerStack } from "../lib/todo-infra-server-stack";

const app = new cdk.App();

new TodoClientDeploymentStack(app, "TodoClientDeploymentStack", {});
new TodoInfraServerStack(app, "TodoInfraServerStack", {});
