import { Template } from 'meteor/templating'

Template.registerHelper('formatDate', (date) => {
  return moment(date).format('DD/MM/YYYY');
})

Template.registerHelper('isAdmin', () => {
  let user = Meteor.user();
  console.log(user);
  return user.emails[0].address == "admin@gmail.com";
})
