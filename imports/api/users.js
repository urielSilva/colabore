import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AccountsServer } from 'meteor/accounts-base'

if(Meteor.isServer) {
  Meteor.publish('users', () => {
    return Meteor.users.find({}, {fields: {
      name: 1,
    }});
  })
  Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find(this.userId, {fields: {
      name: 1,
    }});
  });
  Accounts.onCreateUser((options, user) => {
    user.name = options.name;
    console.log(user.name);
    return user;
  });
}



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
  'users.login'() {
    check(taskId, String)
    Tasks.update(taskId, {$set: {active: false}});
  },
});
