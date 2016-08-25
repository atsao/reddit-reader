var request = require('request');
var rawjs = require('raw.js');
var reddit = new rawjs('Test');
var config = require('../config/env.js');

reddit.setupOAuth2(config.reddit.client_id, config.reddit.client_secret, "http://localhost:3000");

module.exports = function(app) {
  app.route('/').post(function(req, res) {
    var subreddit, options;
    if (req.body.subreddit === 'front-page') {
      subreddit = '';
    } else {
      subreddit = '/r/' + req.body.subreddit;
    }

    options = {
      url: 'https://json.reddit.com' + subreddit
    };
    return request.get(options, function(err, response) {
      if (err) throw new Error(err);
      res.send(response);
    });
  });
}