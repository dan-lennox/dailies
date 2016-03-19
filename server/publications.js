Meteor.publish('Dailies', function(userId) {
  return Dailies.find({user: userId});
});

Meteor.publish('Images', function() {
  return Images.find();
});