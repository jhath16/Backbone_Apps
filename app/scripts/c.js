(function() {
  'use strict';

    var BlogPost = Backbone.Model.extend({});

    var Posts = Backbone.Collection.extend({
      model:BlogPost,

      initialize:function () {
        var that=this;
        this.fetch().done(function () {
          // console.log(that.models);
        });
      },

      url:"http://tiny-pizza-server.herokuapp.com/collections/posts",
    });

    var PostListView = Backbone.View.extend({
      tagName:'ul',
      initialize: function () {
        console.log('View created');
        this.render();
        this.renderChildren();
      },

      render: function () {
        $('.container').append(this.el);
      },

      renderChildren:function () {
        console.log(this.el);
        // _.each(this.collection.models, function() {
        //   console.log('scoping issues?')
        //   // var postTitleView = new PostTitleView({model:model});
        //   // this.el.append(postTitleView);
        // }, this);
      }
    });

    var PostTitleView = Backbone.View.extend({
      tagName:'li',
      initialize: function () {
        console.log('You made a title view. Good job');
        this.render();
      },

      render:function () {
        this.$el.html(this.model.get('title'));
        console.log(this.el);
        $('.container').append(this.el);
        return this;
      }
    });

    $(document).ready(function() {
      var posts = new Posts();
      var postListView = new PostListView({collection:posts});
    });


  //We'll probably need to use a router so be familiar with that
  //It will only have to change the url on a click event of a titleview(that will contain a model)
  //It will then open up a new view(handled by router) that will use the information from the model clicked(use the id from the model(clicked) in the collection(which is the accumulation of the models the server))
})();
