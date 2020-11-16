import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import logs = require('@aws-cdk/aws-logs');
import logsDestinations = require('@aws-cdk/aws-logs-destinations');
import Path from 'path';
import iam = require('@aws-cdk/aws-iam');
import { appsDir } from '../helper';
import { ApiLambda } from './ApiLambda';
import { getLambdaSharedEnv } from '../getLambdaSharedEnv';
import { MainBucket } from './MainBucket';
import { MainTopic } from './MainTopic';
import { MainTable } from './MainTable';

interface LogLambdaDeps {
  apiLambda: ApiLambda;
  mainBucket: MainBucket;
  mainTopic: MainTopic;
  mainTable: MainTable;
}

export class LogLambda {
  private logLambda: lambda.Function;

  constructor(scope: cdk.Construct, initOnly: boolean, deps: LogLambdaDeps) {
    const { apiLambda } = deps;
    if (!process.env.REPORT_ERROR_EMAIL) {
      throw new Error('REPORT_ERROR_EMAIL is not set');
    }
    this.logLambda = new lambda.Function(scope, `log-lambda`, {
      code: initOnly
        ? new lambda.InlineCode('//init placeholder')
        : new lambda.AssetCode(Path.join(appsDir, 'api/dist')),
      handler: 'app-lambda.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: initOnly
        ? ({} as any)
        : {
            ...getLambdaSharedEnv(deps),
            IS_AWS: '1',
            NODE_ENV: 'production',
            REPORT_ERROR_EMAIL: process.env.REPORT_ERROR_EMAIL,
          },
      timeout: cdk.Duration.seconds(7),
      memorySize: 512,
    });
    const apiLambdaPolicy = new iam.PolicyStatement();
    apiLambdaPolicy.addAllResources();
    apiLambdaPolicy.addActions('ses:sendEmail');
    this.logLambda.addToRolePolicy(apiLambdaPolicy);

    const apiLogGroup = logs.LogGroup.fromLogGroupName(
      scope,
      'apiLogGroup',
      '/aws/lambda/' + apiLambda.getLambdaFunction().functionName
    );

    new logs.SubscriptionFilter(scope, 'apiLogGroup-Subscription', {
      logGroup: apiLogGroup,
      destination: new logsDestinations.LambdaDestination(this.logLambda),
      filterPattern: logs.FilterPattern.allTerms('ERROR'),
    });
  }
}
