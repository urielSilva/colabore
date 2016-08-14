import { Template } from 'meteor/templating'

Template.registerHelper('formatDate', (date) => {
  return moment(date).format('DD/MM/YYYY');
})
