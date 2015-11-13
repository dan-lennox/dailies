// Define a collection to hold our dailies
Dailies = new Mongo.Collection("dailies");

ImageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [ImageStore]
});

// @Todo - image access
Images.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
 });

// @Todo - image access
Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

if (Meteor.isClient) {
  // This code is executed on the client only
 
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });

  // Images.on('stored', function(fileObj, storeName) {
  //   console.log('stoooorreed');
  // });
}

if (Meteor.isServer) {

  
}

// imageStore.on('stored', Meteor.bindEnvironment(function(fileObj, storeName) {
//   if (storeName === 'images') {
//       let imageUrl = "/cfs/files/images/" + fileObj._id;
//       //Meteor.users.update(userId, {$set: imagesURL});
//       //console.log(this.props.daily._id);
//       console.log(id._str);

//       // @todo: Use a meteor method instead of this, which is calling directly from
//       // the client without any security.
//       Dailies.update(id, {
//         $set: {
//           imageUrl: imageUrl,
//           createdAt: new Date()
//         }
//       });

//       // Add a new empty daily. 
//       Dailies.insert({});
//   }
// }, function() { console.log('Failed to bind environment'); }));