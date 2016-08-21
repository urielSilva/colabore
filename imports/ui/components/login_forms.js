import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base'
import { AccountsServer } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

import './login_forms.html'
import '/imports/api/users.js'


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
          Meteor.loginWithPassword(email,password);
        } else {
          let name = event.target.name.value;
          id = Accounts.createUser({email,password,name});
          Roles.addUsersToRoles(id, "employee", Roles.GLOBAL_GROUP);
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
