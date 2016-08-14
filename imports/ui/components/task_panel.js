import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Tasks } from '../../api/tasks.js'
import './task_panel.html'
import './task.js'

Template.task_panel.events({
  'submit .new_task' (event) {
    event.preventDefault();

    const target = event.target;
    const desc = target.description.value;
    Meteor.call('tasks.insert', desc);

    target.description.value = '';
    $('#new-task-toggle').click();
    $('#new-task-toggle').show();
    toastr.success("Tarefa cadastrada com sucesso.");
  },

  'click #new-task-toggle' (event) {
    $('#new-task-toggle').hide();
  },
  'click #new-task-cancel' (event) {

    $('#new-task-toggle').click();
    $('#new-task-toggle').show();
  }
})

Template.task_panel.helpers( {
  tasks: function() {
    return Tasks.find({ $or: [
        { active: {$eq: true}},
      ]});
  }

})
