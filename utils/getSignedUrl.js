const s3 = require("../config/aws-config");

const generateSignedUrl = (key, contentType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 5, // URL expires in 5 minutes
    ContentType: contentType, // Accept all image formats
  };

  return s3.getSignedUrl("putObject", params);
};

module.exports = generateSignedUrl;
