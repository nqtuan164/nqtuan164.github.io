// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
    facebook: '//connect.facebook.net/en_US/all',
    templates: '../templates'
	}, 

	shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        facebook: {
            exports: 'FB'
        },
    }
});
require(['fb']);
require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();

  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };

  $(".btnHowtoplay").on("click", function() {
      $(".howtoplay").fadeIn('slow');
  });
  $("#btnGotit").on("click", function() {
      $(".howtoplay").fadeOut('slow');
  });
  // $(".btn-back").on('click', function() {
  //   Backbone.history.navigate("", {trigger : true});
  //   $(".hover").css("display", "none");
  //   $(".result-hover-fail").css("display", "none");
  //   $(".result-hover-win").css("display", "none");
  //   $(".howtoplay").css("display", "none");
  //   $(".btn-control").html("Start!").attr("role", "start");
  // });

});