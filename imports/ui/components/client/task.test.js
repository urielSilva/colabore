import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';


import { withRenderedTemplate } from '../../test-helpers.js';
import '../task.js';

describe('tasks', function () {
  beforeEach(function () {
    Template.registerHelper('_', key => key);
  });

  afterEach(function () {
    Template.deregisterHelper('_');
  });

  it('renders correctly with simple data', function () {
    const data = Factory.build('task');
    withRenderedTemplate('task', data, el => {
      chai.assert.equal($(el).find('p').html(), data.description);
      let date = `Criada em ${moment(data.createdAt).format('DD/MM/YYYY')}`;
      chai.assert.equal($(el).find('small').html(), date);
    });
  });
});
