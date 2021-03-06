module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET_KEY"),
      region: env("AWS_REGION"),
      params: {
        Bucket: "career-anxiety-2020-staging-media",
      },
    },
  },
});
