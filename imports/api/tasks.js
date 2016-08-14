import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(description, checked=false) {
    check(description, String);

    Tasks.insert({
      description,
      checked: checked,
      createdAt: new Date()
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String)
    Tasks.remove(taskId);
  },
});
