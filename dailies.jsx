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
  Meteor.subscribe("Images");

  Accounts.onLogin(function() {
    FlowRouter.go('/');
  });
}

if (Meteor.isServer) {
  // This code is executed on the server only. 

  
}