Meteor.publish('Dailies', function(userId) {
  return Dailies.find({user: userId});
});

Meteor.publish('Images', function() {
  // @TODO: We should just be publishing Images linked to published dailies.
  return Images.find();
});