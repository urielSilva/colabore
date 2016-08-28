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

});

Template.user_task.events({
  'click .undo-task'() {
    Meteor.call('users.undo_task', Template.parentData(1)._id, this._id);
    toastr.success('Tarefa desfeita com sucesso');
  },
  'click .complete-task'() {
    Meteor.call('users.complete_task', Template.parentData(1)._id, this._id);
    let taskId = this._id;
    toastr.success('Tarefa finalizada com sucesso. Clique para desfazer', "", {onclick() {
     Meteor.call('users.undo_task', Template.parentData(1)._id, taskId);
   }});
  }
});

Template.user_tasks.helpers({
  users() {
      return Meteor.users.find({"emails.address": { $ne: 'romulo@gmail.com'}});
  }
});

Template.user_task.helpers({
  checkedClass(checked) {
    return checked? 'task-checked' : 'task-unchecked'
  }
});
