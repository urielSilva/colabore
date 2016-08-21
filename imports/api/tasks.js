import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(description, checked=false, active=true) {
    check(description, String);

    let obj = {
      description,
      checked,
      active: active,
      createdAt: new Date()
    };
    return Tasks.insert(obj);

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

Factory.define('task', Tasks, {
  description: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
  active: () => true,
  checked: () => false,
});
