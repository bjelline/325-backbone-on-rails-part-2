Raffler.Collections.Entries = Backbone.Collection.extend({

  model: Raffler.Models.Entry,
  url: '/api/entries',

  drawWinner: function() {
    var winning_entry;
    winning_entry = this.shuffle()[0];
    if (winning_entry) {
      winning_entry.win();
    }
  }
});
