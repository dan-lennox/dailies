Meteor.publish('Dailies', function(userId) {
  if (!userId) {
    return Dailies.find();
  }
  return Dailies.find({user: userId});
});

Meteor.publish('Images', function() {
  // @TODO: We should just be publishing Images linked to published dailies.
  return Images.find();
});