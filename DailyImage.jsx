// Task component - represents a single todo item
// @todo Might make more sense to have "Image", which has an instance of an uploader available? (service, dependancy injection)
// lets just get the one going for now though.
ImageUploader = React.createClass({

  handleChange(event) {
    event.preventDefault();
 
    console.log('Called submit');
    // Find the text field via the React ref
    //var image = React.findDOMNode(this.refs.fileInput).value.trim();
 
    //Meteor.call("addTask", text);
 
    // Clear form
    //React.findDOMNode(this.refs.textInput).value = "";

    // THIS IS WORKING!!! But currently it's saving the image to the user profile.
    // TODO SAVE TO NEW IMAGE OBJECT/TYPE etc.
    FS.Utility.eachFile(event, function(file) {
      console.log('one');
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
             console.log('two');
          } else {
            console.log('three');
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = {
              "profile.image": "/cfs/files/images/" + fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
          }
          console.log('four');
        });
        console.log('five');
     });
  },

  render() {
    return (
      <form className="new-task" >
        <input
        type="file"
        ref="fileInput" 
        onChange={this.handleChange} />
      </form> 
    );
  }
});