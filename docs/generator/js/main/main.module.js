(function() {
	'use strict';

	angular
		.module('app.main', [
			'ionic'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: 'js/main/main.html',
					controller: 'mainCtrl as vm',
					cache: false
                })
		});
})();