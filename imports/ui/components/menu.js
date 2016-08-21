import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import { $ } from 'meteor/jquery';
import '../../api/users.js'
import './menu.html'
Template.menu.onCreated(() => {
  Tracker.autorun(() => {
      Meteor.subscribe('userData');
  })
})

Template.menu.events({

  'click .toggle-checked'() {
    Meteor.call('tasks.check', this._id, !this.checked);
  },

  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  }
});

Template.menu.helpers({
  name() {
      return Meteor.user().name;
  }
})
