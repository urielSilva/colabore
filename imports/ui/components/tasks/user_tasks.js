import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../helpers.js'
import '/imports/api/tasks.js'
import './user_tasks.html'

Template.user_tasks.onRendered(() => {
  $('#datepicker').datepicker();
  Meteor.subscribe('users');
})

Template.user_tasks.events({

  'click .toggle-checked'() {
    Meteor.call('tasks.check', this._id, !this.checked);
  },

  'click .delete-task'() {
    Meteor.call('tasks.unset', this._id, Template.currentData().user_id);
    toastr.error('Tarefa removida para este usuário. Clique para desfazer', "", {onclick() {
      Meteor.call('tasks.activate', id);
    }});
  }
});

Template.user_tasks.helpers({
  users() {
      return Meteor.users.find({"emails.address": { $ne: 'romulo@gmail.com'}});
  },
  checkedClass(checked) {
    return checked? 'task-checked' : 'task-unchecked'
  }
});
