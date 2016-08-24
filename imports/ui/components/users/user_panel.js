import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '/imports/api/tasks.js'

import './user_panel.html'
import '../tasks/task_card.js'
Template.user_panel.onCreated(() => {
  Meteor.subscribe('userData');
  this.state = new ReactiveDict();
});


Template.user_panel.helpers( {
  tasks() {
    return Meteor.user().tasks;
  }
});
