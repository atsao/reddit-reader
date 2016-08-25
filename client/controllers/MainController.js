angular.module('MainController', []).controller('MainController', function($scope, MainService) {
  $scope.subredditList = [];
  $scope.tracking = {};
  $scope.posts = [];
  $scope.loading = false;

  $scope.addSubreddit = function() {
    if ($scope.subredditList.indexOf($scope.subreddit) !== -1) {
      $scope.subreddit = '';
      return;
    }
    $scope.subredditList.push($scope.subreddit);
    $scope.subreddit = '';
  };

  $scope.editSubreddit = function(index) {
    var subreddit = prompt('Enter the subreddit name', $scope.subredditList[index]);

    $scope.subredditList[index] = subreddit !== null ? subreddit : $scope.subredditList[index];
  };

  $scope.deleteSubreddit = function(index) {
    $scope.subredditList.splice(index, 1);
  };

  $scope.generateFeed = function() {
    if ($scope.loading) return;

    $scope.subredditList.forEach(function(subreddit) {
      $scope.fetchData(subreddit);
    });
  };

  $scope.fetchData = function(subreddit) {
    $scope.loading = true;
    $scope.posts = [];

    MainService.getData(subreddit).then(function(response) {
      var posts = JSON.parse(response.data.body);
      $scope.posts = posts.data ? $scope.posts.concat(posts.data.children) : $scope.posts;
      $scope.loading = false;
      // console.log($scope.posts);
      // console.log('length:', $scope.posts.length);
    }).catch(function(error) {
      throw new Error(error);
    });
  }

  $scope.$watchCollection('subredditList', function(newValue, oldValue) {
    if (newValue.length == 0) {
      $scope.posts = [];
      $scope.fetchData('front-page');
    } else {
      $scope.generateFeed();
    }

  });
});