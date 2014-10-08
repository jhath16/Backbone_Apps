'use strict';

var FormModel = Backbone.Model.extend({
  url:"http://tiny-pizza-server.herokuapp.com/collections/people",

  validate: function (attributes) {
    if (!attributes.first_name) {
      return {prop:"first_name",message:'You must have a first name'};
    };
    if (!attributes.last_name) {
      return {prop:"last_name", message:'You must have a last name'};
    };
    if(!attributes.address) {
      return {prop:'address', message:'You must enter an address'};
    };
    if(typeof +attributes.phone_number != 'number' || attributes.phone_number.length !=10 ) {
      return {prop:'phone_number', message:'You must enter 10 digits and use all numbers'};
    };
  }
});

var FormView = Backbone.View.extend({
  initialize: function () {
    console.log('View created');
    this.listenTo(this.model, 'invalid', this.invalidInput)
  },

  template:_.template($('#form-template').text()),

  events: {
    'click button' : 'submit'
  },

  submit:function (e) {
    e.preventDefault();
    var firstName = this.$('.first-name').val();
    var lastName = this.$('.last-name').val();
    var address = this.$('.address').val();
    var phoneNumber = this.$('.phone-number').val();
    this.model.save({first_name:firstName, last_name:lastName, address: address, phone_number: phoneNumber});
  },

  render: function () {
    this.$el.html(this.template());
    $('.form-container').append(this.el);
  },

  invalidInput:function(model,error){
    $('input, textarea').removeClass('invalid');
    $('[name=' + error.prop +']').addClass('invalid');
    alert(error.message);
  }
});


$(document).ready(function () {
  var formView = new FormView({model:new FormModel()});
  formView.render();
});
