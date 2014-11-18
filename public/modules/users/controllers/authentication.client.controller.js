'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.get_captcha = function() {
			$http.get('/captcha_x', {}).success(function(response) {
			
				$scope.captcha= response[0];
				console.log('BBB',response[0]);


				
			//	$location.path('/#!/signup');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		

		$scope.signup = function() {

            console.log('AAA',this.verify);
            console.log($scope.captcha);


            if ( this.verify === $scope.captcha ) {

			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				   
				  
			
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/'); 
		    
			
			}).error(function(response) {
				$scope.error = response.message;
			});
			} 
			else { $scope.error = '验证码不正确';}
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);