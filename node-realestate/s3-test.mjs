import AWS from "aws-sdk";

AWS.config.update();

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const uploadParams = {
  Bucket: "psi-imports",
  Key: "hello",
  Body: "world",
}

s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  }

  if (data) {
    console.log("Upload Success", data.Location);
  }
});

