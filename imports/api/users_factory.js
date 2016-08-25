import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random'
import faker from 'faker';
const Users = Meteor.users;

import './tasks_factory';

const task = {
  _id: Random.id(),
  description: faker.lorem.sentence(),
  createdAt: new Date(),
  deadline: '31/12/2016',
  checked: false,
  active: true};

  const completed_task = {
    _id: Random.id(),
    description: faker.lorem.sentence(),
    createdAt: new Date(),
    deadline: '31/12/2016',
    checked: true,
    active: true
  }

Factory.define('user', Users, {
  name: () => "Frodo",
  createdAt: () => new Date(),
  tasks: [Factory.get('task')],
});

Factory.define('user_with_task', Users, {
  name: () => "Frodo",
  createdAt: () => new Date(),
  tasks: [task],
});

Factory.define('user_with_completed_task', Users, {
  name: () => "Frodo",
  createdAt: () => new Date(),
  tasks: [completed_task],
});
