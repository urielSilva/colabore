import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';

import './tasks.js';
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

  it('soft deletes a task', function(){
      var id;
      Meteor.call('tasks.insert', 'testeiro', function(error,result) {
        id = result;
      });
      Meteor.call('tasks.remove', id);
      let task = Tasks.findOne({_id: id});
      expect(task.active).to.be.false;
  });

  
}


});
