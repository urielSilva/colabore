import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer) {
  Meteor.publish('tasks', function() {
    return Tasks.find({ $or: [
        { active: {$eq: true}},
      ]});
  });
  Meteor.publish('user_tasks', function(userId) {
    return Tasks.find({users: userId, active: true});
  });
}

Meteor.methods({
  'tasks.insert'(description, users, deadline, checked=false, active=true) {
    check(description, String);

    let obj = {
      description,
      checked,
      active: active,
      deadline,
      users,
      createdAt: new Date(),
    };
    id =  Tasks.insert(obj);
    _.each(users, (user) => {
      Meteor.users.update(user, {
        $push: { tasks: id}
      });
    });

    return id;
  },
  'tasks.activate' (taskId) {
    check(taskId, String)
    Tasks.update(taskId, {$set: {active: true}});
  },
  'tasks.unset'(taskId) {
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
