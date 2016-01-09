/*
 * Mobile Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'text!templates/mobile.html'
], function ($, _, Backbone, MobileTemplate) {
	var MobileView = Backbone.View.extend({
		el: '#container',
		render: function() {
            console.log('We are at Mobile');
			this.$el.html(MobileTemplate);
		}, 
		events: {
			'click .closeMobile': 'closeMobile',
		},
		closeMobile: function() {
			window.location.href = "http://www.google.com/";
		}

		
	});
	return MobileView;
})