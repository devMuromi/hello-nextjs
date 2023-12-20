const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        firebase_url: "https://hello-nextjs-9a642-default-rtdb.firebaseio.com",
      },
    };
  }

  return {
    env: {
      firebase_url: "https://hello-nextjs-9a642-default-rtdb.firebaseio.com",
    },
  };
};
