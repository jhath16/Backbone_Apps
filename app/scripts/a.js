var BlogModel = Backbone.Model.extend({
  url:'http://tiny-pizza-server.herokuapp.com/collections/posts'
});

var BlogPostView = Backbone.View.extend({
  initialize:function() {
    console.log('View created');
    this.render();
  },

  template: _.template($('#input-template').text()),

  render: function(e) {
    this.$el.html(this.template());
    $('.container').append(this.el);
  },

  events: {
    'click button' : 'submit'
  },

  submit: function (e) {
    e.preventDefault();
    var title = this.$('.title').val();
    var body = this.$('.body').val();
    this.model.save({ title:title , body:body })
    this.$('.title')[0].value = '';
    this.$('.body')[0].value = '';
  }
})

$(document).ready(function() {
var blogPostView = new BlogPostView({model: new BlogModel});
})
