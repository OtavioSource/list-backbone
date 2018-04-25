    app.VetView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#list-template').html()),
        render: function(){
          this.$el.html(this.template(this.model.toJSON()));
          return this; // enable chained calls
        }
    });

    app.VetDetailView = Backbone.View.extend({
      template: _.template($('#detail-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      }
  });