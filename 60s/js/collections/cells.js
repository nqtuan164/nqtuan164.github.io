define([
	'jquery',
	'underscore',
 	'backbone',
 	'models/cell'
], function ($, _, Backbone, Cell) {
	var Cells = Backbone.Collection.extend({
		models: Cell
	});

	return Cells;
});