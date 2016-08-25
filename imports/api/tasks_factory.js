import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { Random } from 'meteor/random'
import { Tasks } from './tasks.js'


Factory.define('task', Tasks, {
  description: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
  active: () => true,
  checked: () => false,
});
