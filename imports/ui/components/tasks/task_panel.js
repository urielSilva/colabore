import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

import { Tasks } from '/imports/api/tasks.js'
import './task_form.js'
import './user_tasks.js'

import './task_panel.html'

Template.task_panel.onCreated(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('users');

})

Template.task_panel.helpers( {
  tasks() {
    let users = Meteor.users.find({"emails.address": { $ne: 'romulo@gmail.com'}});
    let user_tasks = [];
    users.forEach((user) => {
      let tasks = Tasks.find({users: user._id});
      user_tasks.push({name: user.name, user_id: user._id, tasks});
    });
    return user_tasks;
  }
})
