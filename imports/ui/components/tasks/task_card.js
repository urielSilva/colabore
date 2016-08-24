import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Tasks } from '/imports/api/tasks.js'

import './task_card.html'

Template.task_card.onCreated(() => {
  Meteor.subscribe('userData');
});

Template.task_card.events({
  'click .complete-task '(event) {
    const taskId = this._id;
    Meteor.call('users.complete_task', Meteor.user()._id, taskId);
    toastr.success('Tarefa finalizada com sucesso. Clique para desfazer', "", {onclick() {
     Meteor.call('users.undo_task', Meteor.user()._id, taskId);
   }});
 },

  'click .undo-task '(event) {
    Meteor.call('users.undo_task', Meteor.user()._id, this._id);
    toastr.success('Tarefa desfeita com sucesso.');
  }

});

Template.task_card.helpers( {
  tasks() {
    return Meteor.user().tasks;
  },
  isChecked() {
    return this.checked;
  },
  checkedClass() {
    return this.checked? 'task-checked' : 'task-unchecked'
  }
});
