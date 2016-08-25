import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random'
import './tasks.js';
import './tasks_factory.js';
import './users_factory.js';
import { Tasks } from './tasks.js'
describe('tasks', function () {
if(Meteor.isServer) {
  it('saves a task', function () {
    var id;
    Meteor.call('tasks.insert', 'testando', function(error, result) {
          id = result;
    });
    chai.expect(id).to.not.be.false;
  });

  it ('assigns a tasks to a user',function() {
    let user = Factory.create('user');
    Meteor.call('tasks.insert', 'testeiro', [user], '31/12/2016');
    user = Meteor.users.findOne(user._id);
    chai.expect(user.tasks.length).to.equal(2);
  })


}


});
