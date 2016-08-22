import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '/imports/api/tasks.js'
import { _ } from 'meteor/underscore'
import './task_form.html'

import './task_panel.html'


Template.task_form.onCreated(() => {
  Meteor.subscribe('users');
  this.state = new ReactiveDict();
})

Template.task_form.events({
  'submit .new_task' (event) {
    event.preventDefault();
    const target = event.target;
    const desc = target.description.value;
    const deadline = target.deadline.value;
    console.log(deadline);
    const selected = Template.instance().findAll( "input[type=checkbox]:checked");
    var users = _.map(selected, function(item) {
      item.checked = false;
      return item.defaultValue;
    });


    Meteor.call('tasks.insert', desc, users, deadline);

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

Template.task_form.helpers( {
  users() {
    return Meteor.users.find({"emails.address": { $ne: 'romulo@gmail.com'}});
  }

})
