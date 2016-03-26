Meteor.publish('Dailies', function(userId) {
  if (!userId) {
    return Dailies.find();
  }
  check(userId, String);
  return Dailies.find({user: userId});
});

Meteor.publish('Images', function() {
  // @TODO: We should just be publishing Images linked to published dailies.
  return Images.find();
});