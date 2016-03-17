Meteor.publish('Dailies', function() {
  return Dailies.find();
});

Meteor.publish('Images', function() {
  return Images.find();
});