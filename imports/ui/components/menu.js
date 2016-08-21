import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './menu.html'

Template.menu.events({

  'click .toggle-checked'() {
    Meteor.call('tasks.check', this._id, !this.checked);
  },

  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  }
})
