// Define a collection to hold our dailies.
Dailies = new Mongo.Collection("dailies");

Meteor.methods({
  updateDaily(id, image) {

    // Type check the inputs from the client for security.
    check(Meteor.userId(), String);
    check(id, String);
    check(image, Object);

    let dailyProperties = {
      image: image,
      createdAt: new Date()
    }

    // Todo: Access Check: Make sure the daily being updated belongs to the current user.
    Dailies.update(id, {$set: dailyProperties}, function(error) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  addDaily() {
    // Make sure the user is logged in before inserting a daily.
    var today = new Date();

    check(Meteor.userId(), String);

    //Add a new empty daily. 
    Dailies.insert({
      user: Meteor.userId(),
      date: today.valueOf()
    });
  }
});