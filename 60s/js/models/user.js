define([
	'jquery',
	'underscore',
 	'backbone'
], function ($, _, Backbone) {
	var User = Backbone.Model.extend({
		initialize: function(options) {
			this.accessToken = options.accessToken;
			this.userID = options.userID;
			this.name = options.name;
		}
	});

	return User;
});