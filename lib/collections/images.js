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