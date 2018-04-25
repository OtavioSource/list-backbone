(function () {
  'use strict';

  var app = {}; // create namespace for our app

  app.VetModel = Backbone.Model.extend({
    defaults: {
      id: '',
      name: '-',
      adress: '-',
      phone:'-',
      email:'-'

    }
  });

  app.VetList = Backbone.Collection.extend({
    model: app.VetModel,
    url: 'http://localhost:3000/veterinary-clinics',

    initialize: function () {
      console.log("Init Collection");
    }
  });

  app.VetView = Backbone.View.extend({
    tagName: 'li',
    className:'list-group-item',
    template: _.template($('#list-template').html()),
    render: function () {
      var json = this.model.toJSON();
      var html = this.template(json)
      this.$el.html(html);
      
      return this;
    }
  });

  app.VetDetailView = Backbone.View.extend({
    className:'card-body',
    template: _.template($('#detail-template').html()),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this; // enable chained calls
    }
  });

  app.vetList = new app.VetList();

  app.AppView = Backbone.View.extend({

    el: '#main',
    initialize: function () {
      app.vetList.fetch(); // Loads list from local storage
      app.vetList.on('add', this.addAll, this);
    },
    events: {
      'click li': 'clickLi',
      'click #back': 'backHome',
    },
    backHome: function () {
      this.$('#veterinary-clinics-list').html(''); // clean the list
      this.addAll();
    },
    clickLi: function (element) {
      this.$('#veterinary-clinics-list').html(''); // clean the list
      this.openDetail(app.vetList.get(element.toElement.id));
    },
    openDetail: function (veterinary) {
      var detail = new app.VetDetailView({ model: veterinary });
      this.$('#veterinary-clinics-list').html('');
      $('#veterinary-clinics-list').append(detail.render().el);
    },
    addOne: function (veterinary) {
      var view = new app.VetView({ model: veterinary });
      $('#veterinary-clinics-list').append(view.render().el);
    },
    addAll: function () {
      this.$('#veterinary-clinics-list').html(''); // clean the todo list
      app.vetList.each(this.addOne, this);
    }

  });

  app.appView = new app.AppView();
})();