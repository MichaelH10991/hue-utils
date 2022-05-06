// https://discovery.meethue.com/

module.exports = config = {
  id: "001788fffe48855c",
  internalipaddress: "192.168.86.248",
  port: 443,
  app_port: process.env.APP_PORT || 8080,
  whitelist: process.env.CORS_WHITELIST || [
    "http://localhost:3000",
    "http://localhost:4000",
    undefined, // allows rest tools
  ],
  db: {
    database_name: process.env.DATABASE_NAME || "home_automation",
    collection_name: process.env.COLLECTION_NAME || "previous", // not used
    username: process.env.MONGODB_USERNAME || "system",
    password: process.env.MONGODB_PASSWORD || "pass",
    mongo_url:
      process.env.MONGODB_URL ||
      "mongodb://localhost:27017?maxPoolSize=20&w=majority",
  },
};
