/*
 * Welcome Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'text!templates/welcome.html'
], function ($, _, Backbone, WelcomeTemplate) {
	var WelcomeView = Backbone.View.extend({
		el: '#container',
		render: function() {
            console.log('We are at Home');
			this.$el.html(WelcomeTemplate);

		}, 
		events: {
			'click #btnEasy' : 'loadEasyMode',
			'click #btnHard' : 'loadHardMode'
		},

		loadEasyMode: function() {
			Backbone.history.navigate('easy', {trigger: true});
		},
		loadHardMode: function() {
			Backbone.history.navigate('hard', {trigger: true});
		}
	});
	return WelcomeView;
})