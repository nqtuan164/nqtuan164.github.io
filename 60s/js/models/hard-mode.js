define([
	'jquery',
	'underscore',
 	'backbone',
 	'models/mode'
], function ($, _, Backbone, Mode) {
	var EasyMode = Mode.extend({
		
		initialize: function () {
			Mode.prototype.initialize.call(this, {
				name: "Easy mode",
				countCell: 64,
				min: 1,
				max: 9
			});
		},
		renderList: function() {
			Mode.prototype.renderList.call(this);
			//console.log(this.cells.toJSON());
			return this.cells.toJSON();
		}
	});

	return EasyMode;
});