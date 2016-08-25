import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random'
import './tasks.js';
import './tasks_factory.js';
import './users_factory.js';
import './users.js'


describe('tasks', function () {
if(Meteor.isServer) {
  it('finishes a task', function () {
    let user = Factory.create('user_with_task');
    Meteor.call('users.complete_task', user._id, user.tasks[0]._id);
    user = Meteor.users.findOne(user._id);
    chai.expect(user.tasks[0].checked).to.be.true;
  });

  it('undoes a task', function () {
    let user = Factory.create('user_with_completed_task');
    console.log(user);
    Meteor.call('users.undo_task', user._id, user.tasks[0]._id);
    user = Meteor.users.findOne(user._id);
    console.log(user);
    chai.expect(user.tasks[0].checked).to.be.false;
  });
}


});
