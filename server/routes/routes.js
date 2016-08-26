var request = require('request');
var rawjs = require('raw.js');
var reddit = new rawjs('Test');
var config = require('../config/env.js');

reddit.setupOAuth2(config.reddit.client_id, config.reddit.client_secret, "http://localhost:3000");

module.exports = function(app) {
  app.route('/').post(function(req, res) {
    var uri = 'https://json.reddit.com';
    var options = {
      uri: uri
    };

    var query = {
      subreddit: req.body.subreddit,
      after: req.body.after || null
    };

    if (query.subreddit !== 'front-page') {
      options.uri += '/r/' + query.subreddit + '/hot';
    } else {
      options.uri += '/hot';
    }
    
    if (query.after) {
      options.uri += '?after=' + query.after;
    }

    console.log('URI: ', options.uri);

    return request.get(options, function(err, response) {
      if (err) throw new Error(err);
      res.json(response);
    });
  });
}