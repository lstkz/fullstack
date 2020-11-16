import cdk = require('@aws-cdk/core');
import cf = require('@aws-cdk/aws-cloudfront');
import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');

export class BlogWebSiteDist {
  constructor(scope: cdk.Construct) {
    const deployBucket = new s3.Bucket(scope, 'BlogDeployBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      cors: [
        {
          allowedOrigins: ['*'],
          allowedMethods: [s3.HttpMethods.GET],
        },
      ],
    });

    const distribution = new cf.CloudFrontWebDistribution(
      scope,
      'BlogWebSite',
      {
        priceClass: cf.PriceClass.PRICE_CLASS_100,
        httpVersion: cf.HttpVersion.HTTP2,
        enableIpV6: true,
        errorConfigurations: [
          {
            errorCode: 403,
            errorCachingMinTtl: 1,
            responsePagePath: '/index.html',
            responseCode: 200,
          },
        ],
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        aliasConfiguration:
          process.env.DOMAIN_CERT && process.env.BLOG_DOMAIN
            ? {
                acmCertRef: process.env.DOMAIN_CERT,
                names: process.env.BLOG_DOMAIN.split(','),
              }
            : undefined,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: deployBucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                forwardedValues: {
                  cookies: {
                    forward: 'none',
                  },
                  queryString: false,
                },
                compress: true,
                allowedMethods: cf.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
                cachedMethods:
                  cf.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
                lambdaFunctionAssociations: process.env.FIX_INDEX_LAMBDA_ARN
                  ? [
                      {
                        eventType: cf.LambdaEdgeEventType.ORIGIN_REQUEST,
                        lambdaFunction: lambda.Version.fromVersionArn(
                          scope,
                          'fix-index-lambda',
                          process.env.FIX_INDEX_LAMBDA_ARN
                        ),
                      },
                    ]
                  : [],
              },
            ],
          },
        ],
      }
    );

    new cdk.CfnOutput(scope, 'blogDeployBucket', {
      value: deployBucket.bucketName,
    });

    new cdk.CfnOutput(scope, 'blogDomainName', {
      value: distribution.domainName,
    });
  }
}
