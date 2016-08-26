angular.module('MainController', []).controller('MainController', function($scope, MainService) {
  $scope.subredditList = [];
  $scope.subredditTracker = {};
  $scope.posts = [];
  $scope.after = null;
  $scope.loading = false;
  $scope.fp = true;

  $scope.addSubreddit = function(subreddit) {
    if ($scope.subredditTracker[subreddit]) {
      $scope.subreddit = '';
      return;
    }
    $scope.subredditList.push(subreddit);
    $scope.subredditTracker[subreddit] = true;
    $scope.fp = false;
    $scope.after = null;
    $scope.subreddit = '';
    $scope.generateFeed();
  };

  $scope.editSubreddit = function(index) {
    var oldName = $scope.subredditList[index];
    var subreddit = prompt('Enter the subreddit name', $scope.subredditList[index]);

    if (subreddit !== null) {
      $scope.subredditList[index] = subreddit;
      delete $scope.subredditTracker[oldName];
      // $scope.addSubreddit(subreddit);
      $scope.cleanPosts();
      $scope.generateFeed();
    }
  };

  $scope.deleteSubreddit = function(index) {
    $scope.loading = true;
    var subredditName = $scope.subredditList[index];

    $scope.subredditList.splice(index, 1);
    delete $scope.subredditTracker[subredditName];

    $scope.subredditList.length && $scope.cleanPosts();
  };

  $scope.cleanPosts = function() {
    var i = $scope.posts.length;
    while (i--) {
      var sub = $scope.posts[i].data.subreddit.toLowerCase();
      if (!$scope.subredditTracker[sub]) {
        $scope.posts.splice(i, 1);
      }
    }

    $scope.after = $scope.posts.length ? $scope.posts[$scope.posts.length - 1].data.name : null;
    $scope.loading = false;
  };

  $scope.generateFeed = function() {
    if ($scope.loading) return;

    var query = '';
    var after = $scope.after;

    if ($scope.subredditList.length === 0) {
      query = 'front-page';
      $scope.fp = true;
    } else {
      $scope.fp = false;
    }

    $scope.subredditList.forEach(function(subreddit) {
      query += subreddit + '+';
    });

    query = query.replace(/\+{1}$/, '');
    $scope.fetchData(query, after);
  };

  $scope.fetchData = function(subreddit, after) {
    $scope.loading = true;
    $scope.posts = after ? $scope.posts : [];

    MainService.getData(subreddit, after).then(function(response) {
      var posts = JSON.parse(response.data.body);
      if (posts.data.children.length) {
        var length = posts.data.children.length;
        $scope.after = posts.data.children[length - 1].data.name;
        $scope.posts = $scope.posts.concat(posts.data.children);
      }
      $scope.loading = false;
      // console.log($scope.posts);
    }).catch(function(error) {
      throw new Error(error);
    });
  }

  $scope.$watch('fp', function(newValue, oldValue) {
    if (oldValue === true && newValue === false) {
      $scope.posts = [];
      $scope.after = null;
    }
  });

  $scope.$watchCollection('subredditList', function(newValue, oldValue) {
    if (newValue.length == 0) {
      $scope.posts = [];
      $scope.fetchData('front-page', null);
    } else {
      $scope.generateFeed();
    }
  });
});