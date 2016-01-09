/*
 * Welcome Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'facebook',
 	'models/user',
 	'text!templates/login-status.html'
], function ($, _, Backbone, FB, User, LoginStatusTemplate) {
	var LoginStatusView = Backbone.View.extend({
		el: '.login-status',
		user: null,
		render: function() {
			this.$el.html(LoginStatusTemplate);
		}, 
		events: {
			'click #btnLogin' : 'LoadLoginForm'
		},
		
		LoadLoginForm: function() {
			var that = this;
			FB.getLoginStatus(function(response) {

			    console.log(response);
			    var userdata = {};
			    if (response.status == 'connected') {
			    	userdata.accessToken = response.authResponse.accessToken;
	    			userdata.userID = response.authResponse.userID;

	    			FB.api('/me', function(response) {
	    				console.log(response);
	    				userdata.name = response.name;
	    				that.user = new User(userdata);
	    				that.LoginSuccess();
	    			});
			    } else {
			    	FB.login(function(response) {
			    		if(response.status == 'connected') {
			    			userdata.accessToken = response.authResponse.accessToken;
			    			userdata.userID = response.authResponse.userID;

			    			FB.api('/me', function(response) {
			    				console.log(response);
			    				userdata.name = response.name;
			    				that.user = new User(userdata);
			    				that.LoginSuccess();
			    			});
			    		}
			    	}, { scope: 'publish_stream' })
			    }

			});
			// Backbone.history.navigate('login', {trigger: true});
		},
		LoginSuccess: function() {
			$(".username").html(this.user.name);
			$(".login-true").css("display", "block");
			$(".login-false").css("display", "none");
		},
		LoginFailed: function() {
			$(".username").html("Myself!");
			$(".login-true").css("display", "none");
			$(".login-false").css("display", "block");
		}
	});

	return LoginStatusView;
})

		