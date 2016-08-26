angular.module('MainController', []).controller('MainController', function($scope, MainService) {
  $scope.subredditList = [];
  $scope.subredditHistory = {};
  $scope.posts = [];
  $scope.after = null;
  $scope.loading = false;

  $scope.addSubreddit = function(subreddit) {
    // if ($scope.subredditHistory['front-page']) {
    //   delete $scope.subredditHistory['front-page'];
    // }

    if ($scope.subredditList.indexOf(subreddit) !== -1) {
      $scope.subreddit = '';
      return;
    }
    $scope.subredditList.push(subreddit);
    // $scope.subredditHistory[subreddit] = '';
    $scope.subreddit = '';
  };

  $scope.editSubreddit = function(index) {
    var subreddit = prompt('Enter the subreddit name', $scope.subredditList[index]);

    $scope.subredditList[index] = subreddit !== null ? subreddit : $scope.subredditList[index];
  };

  $scope.deleteSubreddit = function(index) {
    var subredditName = $scope.subredditList[index];

    $scope.subredditList.splice(index, 1);
    delete $scope.subredditHistory[subredditName];

    // Call cleanPosts
    $scope.cleanPosts(subredditName);
  };

  $scope.cleanPosts = function(subreddit) {
    $scope.loading = true;
    $scope.posts.forEach(function(post, i) {
      if (post.data.subreddit.toLowerCase() == subreddit.toLowerCase()) {
        $scope.posts.splice(i, 1);
      }
    });

    $scope.after = $scope.posts[$scope.posts.length - 1].data.name;
    $scope.loading = false;
  };

  $scope.generateFeed = function() {
    if ($scope.loading) return;

    var query = '';
    var after = $scope.after;

    if ($scope.subredditList.length === 0) {
      // var after = $scope.subredditHistory['front-page'] || null;
      // $scope.fetchData('front-page', after);
      query = 'front-page';
      after = null;
    }

    $scope.subredditList.forEach(function(subreddit) {
      // var after = $scope.subredditHistory[subreddit] || null;
      // $scope.fetchData(subreddit, after);
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
        // var newAfter = ;
        // console.log('newAfter: ', newAfter);
        // $scope.subredditHistory[subreddit] = newAfter;
        $scope.after = $scope.subredditList.length !== 0 ? posts.data.children[length - 1].data.name : null;
        $scope.posts = $scope.posts.concat(posts.data.children);
      }
      $scope.loading = false;
      console.log($scope.posts);
    }).catch(function(error) {
      throw new Error(error);
    });
  }

  $scope.$watchCollection('subredditList', function(newValue, oldValue) {
    if (newValue.length == 0) {
      $scope.posts = [];
      $scope.fetchData('front-page', null);
    } else {
      $scope.generateFeed();
    }
  });


});