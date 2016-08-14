import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../helpers.js'
import '../../api/tasks.js'
import './task.html'

Template.task.events({

  'click .toggle-checked'() {
    Meteor.call('tasks.check', this._id, !this.checked);
  },

  'click .task-delete'() {
    let id = this._id;
    Meteor.call('tasks.remove', this._id);
    toastr.error('Removido com sucesso. Clique para desfazer', "", {onclick() {
      Meteor.call('tasks.activate', id);
    }});
  }
})
