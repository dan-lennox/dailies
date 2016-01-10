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

var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};

if (Meteor.isClient) {

  // This code is executed on the client only
 
  // Before installing flowrouter, this is how we handled the initial rendering of
  // content at '/'.
  // Meteor.startup(function () {
  //   // Use Meteor.startup to render the component after the page is ready
  //   ReactDOM.render(<App />, document.getElementById("render-target"));
  // });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Accounts.onLogin(function() {
    FlowRouter.go('/');
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

// Routes.
// TODO: Work out convention here.. should this be stored in another file?

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    //The key 'content' is now a function 
    ReactLayout.render(App, {
      content() {
        return <div><DailiesListing /></div>;
      }
    });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function(params) {
    //The key 'content' is now a function 
    ReactLayout.render(App, {
      content() {
        return <Accounts.ui.LoginFormSet />
      }
    });
  }
});

FlowRouter.route('/logout', {
  triggersEnter: [function(context, redirect) {
    Meteor.logout();
    FlowRouter.go('/login');
  }],
});