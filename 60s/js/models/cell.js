define([
	'jquery',
	'underscore',
 	'backbone'
], function ($, _, Backbone) {
	var Cell = Backbone.Model.extend({
		defaults: {
			id: 0,
			value: 0,
			status: 0 //0: hidden, 1: visibility
		},
		initialize: function(options) {
			this.id = options.id,
			this.value = options.value,
			this.status = options.status
		}
	});

	return Cell;
});