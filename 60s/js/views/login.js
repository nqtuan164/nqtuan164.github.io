/*
 * Login Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'facebook',
 	'text!templates/login.html'
], function ($, _, Backbone, FB, LoginTemplate) {
	var LoginView = Backbone.View.extend({
		el: '#container',
		render: function() {
            console.log('We are at Login');
			this.$el.html(LoginTemplate);
		}, 
		events: {
			'click #btnSignIn' : 'loginValidation'
		},

		loginValidation: function() {
			FB.getLoginStatus(function(response) {
			    console.log(response);
			});
		}
	});
	return LoginView;
})