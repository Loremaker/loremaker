const requiredEnvList = [
  "SENTRY_PROJECT",
  "SENTRY_ORG",
  "SENTRY_AUTH_TOKEN",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "OPENAI_API_KEY",
  "HELIUS_API_KEY",
];

// Skip checking environment variables if in local development or running on CI
if (
  process.env.NODE_ENV &&
  process.env.NODE_ENV !== "development" &&
  !process.env.CIRCLECI
) {
  requiredEnvList.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} is not defined`);
    }

    console.log("✅", envVar, "is defined");
  });
}
