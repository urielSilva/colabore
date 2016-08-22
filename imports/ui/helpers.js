import { Template } from 'meteor/templating'

Template.registerHelper('formatDate', (date) => {
  return moment(date).format('DD/MM/YYYY');
})

Template.registerHelper('isAdmin', () => {
  return Meteor.user().emails[0].address == "romulo@gmail.com";
})
