// Local variables from config.js
// module.exports = {
  // reddit: {
  //   client_id: require('./config').reddit.client_id,
  //   client_secret: require('./config').reddit.client_secret
  // }
// }

// Deployed - use environment variables
module.exports = {
  reddit: {
    client_id: process.env.REDDIT_CLIENT_ID,
    client_secret: process.env.REDDIT_CLIENT_SECRET,
  }
}