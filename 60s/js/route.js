/*
 * Router
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'facebook',
 	'views/login-status',
 	'views/welcome',
 	'views/login',
 	'views/audio-view',
 	'views/easy-mode-view',
 	'views/hard-mode-view', 
 	'views/mobile',
], function ($, 
			_, 
			Backbone, 
			FB, 
			LoginStatusView, 
			WelcomeView, 
			LoginView, 
			AudioView, 
			EasyModeView, 
			HardModeView, 
			MobileView) {
	var AppRoute = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'easy' : 'easy',
			'hard' : 'hard'
		}
	});

	var initialize = function() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			var mobile_view = new MobileView();
			mobile_view.render();
		} else {
			FB.init({
				appId: '1442037889351649'
			});
			var router = new AppRoute();
			var login_status = new LoginStatusView();
			var audio_view = new AudioView();
			audio_view.render();
			login_status.render();
			router.on('route:home', function() {
				//console.log('We are at home');
				var welcome_view = new WelcomeView();
				welcome_view.render();
			});

			router.on('route:login', function() {
				var login_view = new LoginView();
				login_view.render();
			});

			router.on('route:easy', function() {
				var easy_mode = new EasyModeView();
				
				easy_mode.render();
			});

			router.on('route:hard', function() {
				var hard_mode = new HardModeView();
				
				hard_mode.render();
			});
		}

		

		Backbone.history.start();
	}
	return {
	    initialize: initialize
	};
})
