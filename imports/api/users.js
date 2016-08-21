import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'users.insert'(description, checked=false, active=true) {
    check(description, String);

    let obj = {
      description,
      checked,
      active: active,
      createdAt: new Date()
    };
    return Tasks.insert(obj);

  },
  'users.login'(taskId) {
    check(taskId, String)
    Tasks.update(taskId, {$set: {active: false}});
  },
});
