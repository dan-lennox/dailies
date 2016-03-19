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

  Meteor.subscribe("Dailies", Meteor.userId());
  Meteor.subscribe("Images");


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