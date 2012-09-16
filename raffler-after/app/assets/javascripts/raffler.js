window.Raffler = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    new Raffler.Routers.Entries;
    Backbone.history.start({pushState: true});
  }
};

$(document).ready(function(){
  Raffler.init();
});
