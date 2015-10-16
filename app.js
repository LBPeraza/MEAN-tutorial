(function() {
    var app = angular.module('flapperNews', ['ui.router']);

    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl',
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                })
            ;
            $urlRouterProvider.otherwise('home');
        }
    ]);

    app.controller('MainCtrl', [
        '$scope',
        'posts',
      function($scope, posts) {
        $scope.test = 'Hello world!';

        $scope.posts = posts.posts;

        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '')
                return;

            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [],
            });

            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            post.upvotes ++;
        }

    }]);

    app.controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'posts',
      function($scope, $stateParams, posts) {

        $scope.post = posts.posts[$stateParams.id];

        $scope.incrementUpvotes = function(comment) {
            comment.upvotes ++;
        }

        $scope.addComment = function() {
            if (!$scope.body || $scope.body === '')
                return;

            $scope.post.comments.push({
                body: $scope.body,
                author: $scope.author || 'Anonymous',
                upvotes: 0,
            });

            $scope.body = '';
            $scope.author = '';
        }

    }]);

    app.factory('posts', [function() {
        var o = {
            posts: [],
        };

        return o;
    }]);

})();