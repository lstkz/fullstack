import cdk = require('@aws-cdk/core');
import apigateway = require('@aws-cdk/aws-apigatewayv2');
import { ApiLambda } from './ApiLambda';

interface GatewayApiDeps {
  apiLambda: ApiLambda;
}

export class GatewayApi {
  constructor(scope: cdk.Construct, deps: GatewayApiDeps) {
    const id = 'api';
    const api = new apigateway.HttpApi(scope, id, {
      apiName: `${process.env.STACK_NAME}_${id}`,
      defaultIntegration: new apigateway.LambdaProxyIntegration({
        handler: deps.apiLambda.getLambdaFunction(),
      }),
    });

    new cdk.CfnOutput(scope, 'apiUrl', {
      value: api.url!,
    });
  }
}
