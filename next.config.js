const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
  if (env === PHRASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:NiFNnRRW6RFzviYX@cluster0.slpqrdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads2",
        NEXTAUTH_SECRET: "jqkesgfiuzfgqzifzpergfhpzpigh",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:NiFNnRRW6RFzviYX@cluster0.slpqrdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads2",
        NEXTAUTH_SECRET: "jqkesgfiuzfgqzifzpergfhpzpigh",
        NEXTAUTH_URL: "https://threads-lyart.vercel.app",
      },
    };
  }
};
