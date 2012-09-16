Raffler.Views.EntriesIndex = Backbone.View.extend({

  template: JST['entries/index'],

  events: {
    'submit #new_entry': 'createEntry',
    'click #draw':       'drawWinner'
  },

  initialize: function(){
    _.bindAll(this, 'render', 'appendEntry');
    this.collection.on('reset', this.render     );
    this.collection.on('add',   this.appendEntry);
  },

  render: function() {
    $(this.el).html(this.template());
    this.collection.each(this.appendEntry);
    return this;
  },

  createEntry: function(event) {
    event.preventDefault();
    var attributes = {
      name: $('#new_entry_name').val()
    };
    this.collection.create(attributes, {
      wait: true,
      success: function() {
         return $('#new_entry')[0].reset();
      },
      error: this.handleError
    });
    $('#new_entry')[0].reset();
  },

  appendEntry: function(entry) {
     var view;
     view = new Raffler.Views.Entry({ model: entry });
     this.$('#entries').append(view.render().el);
  },

  handleError: function(entry, response) {
   var attribute, errors, message, messages, _results;
   if (response.status === 422) {
     errors = $.parseJSON(response.responseText).errors;
     _results = [];
     for (attribute in errors) {
       messages = errors[attribute];
       _results.push((function() {
         var _i, _len, _results1;
         _results1 = [];
         for (_i = 0, _len = messages.length; _i < _len; _i++) {
           message = messages[_i];
           _results1.push(alert("" + attribute + " " + message));
         }
         return _results1;
       })());
     }
     return _results;
   }
 },

 drawWinner: function(event) {
   event.preventDefault();
   this.collection.drawWinner();   
 }
});
