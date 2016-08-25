angular.module('MainDirectives', []).directive('reddit', function() {
  return {
    restrict: 'EA',
    templateUrl: '../../views/post.html',
    replace: false,
    scope: {
      post: '='
    },
  };
});