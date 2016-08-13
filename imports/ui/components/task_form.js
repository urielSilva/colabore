import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Tasks } from '../../api/tasks.js'
import './task_form.html'

Template.task_form.events({
  'submit .new_task' (event) {
    event.preventDefault();

    const target = event.target;
    const desc = target.description.value;
    console.log(desc);
    Meteor.call('tasks.insert', desc);

    target.description.value = '';
  }
})

Template.task_form.helpers( {
  tasks: function() {
    return Tasks.find({});
  }

})
