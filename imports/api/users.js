import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AccountsServer } from 'meteor/accounts-base'

if(Meteor.isServer) {
  Meteor.publish('users', () => {
    return Meteor.users.find({}, {fields: {
      name: 1,
      emails: 1,
      tasks: 1
    }});
  })
  Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find(this.userId, {fields: {
      name: 1,
      emails: 1,
      tasks: 1
    }});
  });


  Accounts.onCreateUser((options, user) => {
    user.name = options.name;
    user.tasks = [];
    return user;
  });
}

Meteor.methods({
  'users.complete_task'(userId, taskId) {
    Meteor.users.update({_id: userId,"tasks._id": taskId}, {$set: {"tasks.$.checked": true}});
  },
  'users.undo_task'(userId, taskId) {
    Meteor.users.update({_id: userId,"tasks._id": taskId}, {$set: {"tasks.$.checked": false}});
  }
});
