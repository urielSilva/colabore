import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer) {
  Meteor.publish('tasks', function() {
    return Tasks.find({});
  });
  Meteor.publish('current_user_tasks', function() {
    return Tasks.find({users: this.userId, active: true});
  });
}

Meteor.methods({
  'tasks.insert'(description, users, deadline, checked=false, active=true) {
    check(description, String);

    // let usersObj = _.map(users, (user) => {
    //   return {
    //     user,
    //     checked,
    //     active
    //   };
    // })

    let obj = {
      description,
      deadline,
      // users: usersObj,
      createdAt: new Date(),
    };
    id =  Tasks.insert(obj);
    obj._id = id;
    obj.checked = checked;
    _.each(users, (user) => {
      Meteor.users.update(user, {
        $push: { tasks: obj}
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
