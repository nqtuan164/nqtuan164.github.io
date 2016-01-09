define([
	'jquery',
	'underscore',
 	'backbone',
 	'models/cell',
 	'collections/cells'
], function ($, _, Backbone, Cell, Cells) {
	var EasyMode = Backbone.Model.extend({
		name: "Mode",
		countCell: 0,
		min: 1,
		max: 9,
		cells: null,
		initialize: function(options) {
			this.name = options.name;
			this.countCell = options.countCell;
			this.min = options.min;
			this.max = options.max;
		},
		renderList: function() { 
			this.cells = new Cells();
			for(var i = 0; i < this.countCell; i++) {
				var item = new Cell({
					id: i,
					value: _.random(this.min, this.max),
					status: 1
				});
				this.cells.push(item);
			}

			return this.cells.toJSON();
		}
	});

	return EasyMode;
});