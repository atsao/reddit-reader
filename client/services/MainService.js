angular.module('MainService', []).service('MainService', function($http) {
  var factory = {};

  factory.getData = function(subreddit) {
    var query = {
      subreddit: subreddit
    }

    return $http({
      method: 'POST',
      url: '/api/reddit',
      data: query,
      contentType: 'application/json'
    }).then(function(data) {
      return data;
    });
  };

  return factory;
});