  import { Meteor } from 'meteor/meteor';
  import { Template } from 'meteor/templating';
  import { $ } from 'meteor/jquery';
  import { ReactiveDict } from 'meteor/reactive-dict';

  import './login_forms.html'

Template.login.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({isLogin: true});
});

Template.login.helpers({
  isLogin() {
    const instance = Template.instance();
    return instance.state.get('isLogin');
  }
});

Template.login.events({
    'submit form'(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        console.log("Form submitted.");
    },

    'click .sign-up'(event) {
        event.preventDefault();
        const instance = Template.instance();
        instance.state.set('isLogin', !instance.state.get('isLogin'));
        $('form').find('input').first().focus();
        $('form')[0].reset();
    }

});
