  import { Meteor } from 'meteor/meteor';
  import { Template } from 'meteor/templating';
  import { $ } from 'meteor/jquery';
  import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base'
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
        let email = event.target.email.value;
        let password = event.target.password.value;
        const instance = Template.instance();
        if(instance.state.get('isLogin')) {
          Meteor.loginWithPassword(email,password, (error) => {
            if(!error) {
              console.log("deu certo");
            }
          });
          console.log("fazendo login");
        } else {
          Accounts.createUser({email,password}, (error) => {
              console.log("deu certo");
          });
          console.log("cadastrando");
        }
    },

    'click .sign-up'(event) {
        event.preventDefault();
        const instance = Template.instance();
        instance.state.set('isLogin', !instance.state.get('isLogin'));
        $('form').find('input').first().focus();
        $('form')[0].reset();
    }

});
