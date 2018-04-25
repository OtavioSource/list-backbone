   app.VetList = Backbone.Collection.extend({
        model: app.VetModel,
        url:'http://localhost:3000/veterinary-clinics',

        initialize:function(){
            console.log("Init Collection");
        }
      });

    app.vetList = new app.VetList();