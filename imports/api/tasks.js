import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(description, checked=false, active=true) {
    check(description, String);

    Tasks.insert({
      description,
      checked,
      active: active,
      createdAt: new Date()
    });
  },

  'tasks.activate' (taskId) {
    check(taskId, String)
    Tasks.update(taskId, {$set: {active: true}});
  },
  'tasks.remove'(taskId) {
    check(taskId, String)
    Tasks.update(taskId, {$set: {active: false}});
  },
});
