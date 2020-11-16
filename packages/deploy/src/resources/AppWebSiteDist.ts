import cdk = require('@aws-cdk/core');
import cf = require('@aws-cdk/aws-cloudfront');
import s3 = require('@aws-cdk/aws-s3');
import { MainBucket } from './MainBucket';

interface AppWebSiteDistDeps {
  mainBucket: MainBucket;
}

export class AppWebSiteDist {
  constructor(scope: cdk.Construct, { mainBucket }: AppWebSiteDistDeps) {
    const cfIdentity = new cf.OriginAccessIdentity(
      scope,
      'CloudFrontOriginAccessIdentity',
      {}
    );

    mainBucket.getS3Bucket().grantRead(cfIdentity);
    const deployBucket = new s3.Bucket(scope, 'AppDeployBucket', {
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

    const distribution = new cf.CloudFrontWebDistribution(scope, 'AppWebSite', {
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
        process.env.DOMAIN_CERT && process.env.APP_DOMAIN
          ? {
              acmCertRef: process.env.DOMAIN_CERT,
              names: process.env.APP_DOMAIN.split(','),
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
            s3BucketSource: mainBucket.getS3Bucket(),
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
            s3BucketSource: mainBucket.getS3Bucket(),
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

    new cdk.CfnOutput(scope, 'appDeployBucket', {
      value: deployBucket.bucketName,
    });

    new cdk.CfnOutput(scope, 'appDomainName', {
      value: distribution.domainName,
    });
  }
}
