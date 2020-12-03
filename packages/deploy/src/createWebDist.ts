import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cf from '@aws-cdk/aws-cloudfront';

export function createWebDist(stack: cdk.Stack, mainBucket: s3.Bucket) {
  const cfIdentity = new cf.OriginAccessIdentity(
    stack,
    'CloudFrontOriginAccessIdentity',
    {}
  );

  mainBucket.grantRead(cfIdentity);
  const deployBucket = new s3.Bucket(stack, 'AppDeployBucket', {
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

  const distribution = new cf.CloudFrontWebDistribution(stack, 'AppWebSite', {
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
      process.env.DOMAIN_CERT && process.env.DOMAIN
        ? {
            acmCertRef: process.env.DOMAIN_CERT,
            names: process.env.DOMAIN.split(','),
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
            cachedMethods: cf.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
          },
        ],
      },
      {
        s3OriginSource: {
          s3BucketSource: mainBucket,
          originAccessIdentity: cfIdentity,
        },
        originPath: '',
        behaviors: [
          {
            pathPattern: '/protected/*',
            forwardedValues: {
              cookies: {
                forward: 'none',
              },
              queryString: false,
            },
            compress: true,
            allowedMethods: cf.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
            cachedMethods: cf.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
          },
        ],
      },
      {
        s3OriginSource: {
          s3BucketSource: mainBucket,
          originAccessIdentity: cfIdentity,
        },
        originPath: '',
        behaviors: [
          {
            pathPattern: '/assets/*',
            forwardedValues: {
              cookies: {
                forward: 'none',
              },
              queryString: false,
            },
            compress: true,
            allowedMethods: cf.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
            cachedMethods: cf.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
          },
        ],
      },
    ],
  });

  new cdk.CfnOutput(stack, 'appDeployBucket', {
    value: deployBucket.bucketName,
  });

  new cdk.CfnOutput(stack, 'appDomainName', {
    value: distribution.distributionDomainName,
  });
}
