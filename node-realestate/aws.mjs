import "dotenv/config";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  s3BucketEndpoint: true,
  endpoint: process.env.ENDPOINT
});

export default AWS;

