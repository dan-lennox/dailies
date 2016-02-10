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