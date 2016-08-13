import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date()
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String)

    Tasks.remove(taskId);
  },
});
