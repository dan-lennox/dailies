// Define a collection to hold our dailies.
Dailies = new Mongo.Collection("dailies");

Meteor.methods({
  updateDaily(id, image) {
    // Make sure the user is logged in before inserting a daily.
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // Todo: Access Check: Make sure the daily being updated belongs to the current user.

    Dailies.update(id, {
      $set: {
        image: image,
        createdAt: new Date()
      }
    });
  },

  addDaily() {
    // Make sure the user is logged in before inserting a daily.
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var today = new Date();

    //Add a new empty daily. 
    Dailies.insert({
      user: Meteor.userId(),
      date: today.valueOf()
    });
  }
});