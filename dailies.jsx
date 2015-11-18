// Define a collection to hold our dailies
Dailies = new Mongo.Collection("dailies");

ImageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [ImageStore],
  filter: {
    allow: {
      // Allow only images in this FS.Collection.
      contentTypes: ['image/*'], 
      extensions: ['png', 'jpg', 'jpeg', 'tiff']
    }
  }
});

if (Meteor.isClient) {
  // This code is executed on the client only
 
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // This code is executed on the server only.
  
}

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
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    //Add a new empty daily. 
    Dailies.insert({});
  }
});

// FS.Collection access control.
Images.allow({
  insert: function(){
    // Todo:
    // Only logged in users
    // Only if it's your own image.
    return true;
  },
  update: function(){
    // Only logged in users
    // Only if it's your own image.
    return true;
  },
  remove: function(){
    // Only logged in users
    // Only if it's your own image.
    return true;
  },
  download: function() {
    // Todo:
    // Only logged in users.
    return true;
  }
});