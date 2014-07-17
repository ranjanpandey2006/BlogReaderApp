var App = angular.module("App",["ionic"]);

App.controller("AppCtrl",["$scope","FreshlyPressed","$log", appCtrlFunc]);
App.service("FreshlyPressed",["$http","$log",freshlyPressedFunc]);

function appCtrlFunc($scope,FreshlyPressed, $log){
	$scope.posts = [];
	$scope.refresh = function(){
		FreshlyPressed.getBlogs($scope);
	}
}

function freshlyPressedFunc($http, $log){

	this.getBlogs = function($scope){
		$http.jsonp("https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK")
		.success(function(result){
			$scope.posts = result.posts;
			$scope.$broadcast("scroll.refreshComplete");
		//	$log.info(JSON.stringify(result.posts));
		});
	};
}