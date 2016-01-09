/*
 * Welcome Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'text!templates/audio.html'
], function ($, _, Backbone, AudioTemplate) {
	var AudioView = Backbone.View.extend({
		el: '.audio-div',
		render: function() {
			this.$el.append(AudioTemplate);
			this.theme_song = document.getElementById('theme-song');
			this.playTheme();
		}, 
		events: {
			'click .sound' : 'sound'
		},
		playTheme: function() {
			this.theme_song.play();
		},
		sound: function() {
			console.log("off");
			if($(".sound").attr('data-sound') == 'on') {
				$(".sound").attr('data-sound', 'off');
				$(".sound").html("Sound on");
				this.theme_song.muted = true;
			} else {
				$(".sound").attr('data-sound', 'on');
				$(".sound").html("Sound off");
				this.theme_song.muted = false;
			}
			
		}

	});
	return AudioView;
});