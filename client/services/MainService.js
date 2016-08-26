angular.module('MainService', []).service('MainService', function($http) {
  var reddit = {};

  reddit.getData = function(subreddit, after) {
    return $http({
      method: 'POST',
      url: '/api/reddit',
      data: {
        subreddit: subreddit,
        after: after
      },
      contentType: 'application/json'
    }).then(function(data) {
      return data;
    });
  };

  return reddit;
});