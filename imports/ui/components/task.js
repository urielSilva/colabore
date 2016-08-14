import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';


import './task.html'

Template.task.events({

  'click .toggle-checked'() {
    Meteor.call('tasks.check', this._id, !this.checked);
  },

  'click .task-delete'() {
    Meteor.call('tasks.remove', this._id);
  }
})
