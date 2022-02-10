import * as cdk from "aws-cdk-lib";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as path from "path";

export class TodoClientDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoBucket = new s3.Bucket(this, "TodoBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    const todoOAI = new cloudFront.OriginAccessIdentity(this, "TodoOAI");

    todoBucket.grantRead(todoOAI);

    const todoWebDistribution = new cloudFront.CloudFrontWebDistribution(
      this,
      "TodoWebDestribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: todoBucket,
              originAccessIdentity: todoOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new s3Deployment.BucketDeployment(this, "TodoBucketDeployment", {
      sources: [Source.asset(path.resolve(__dirname, "../../todo-client/out"))],
      destinationBucket: todoBucket,
      distribution: todoWebDistribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "TodoWebDestributionName", {
      value: todoWebDistribution.distributionDomainName,
    });
  }
}
