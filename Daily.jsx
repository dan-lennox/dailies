// Task component - represents a single todo item
// @todo Might make more sense to have "Image", which has an instance of an uploader available? (service, dependancy injection)
// lets just get the one going for now though.
Daily = React.createClass({

  propTypes: {
    // State empty (db stored) / filled (db stored) / edit (temporary stored)

    daily: React.PropTypes.object.isRequired,
  },

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
    // FS.Utility.eachFile(event, function(file) {
    //   console.log('one');
    //   console.log(this.props.daily._id);
    var file = event.target.files[0];
    var id = this.props.daily._id;

    var fileObj = Images.insert(file);// {
      // if (err){
      //    // handle error
      // } else {
      //   console.log('insert called');

        // let imageUrl = "/cfs/files/images/" + fileObj._id;
        // //Meteor.users.update(userId, {$set: imagesURL});
        // //console.log(this.props.daily._id);
        // console.log(id._str);

        // // @todo: Use a meteor method instead of this, which is calling directly from
        // // the client without any security.
        // Dailies.update(id, {
        //   $set: {
        //     imageUrl: imageUrl,
        //     createdAt: new Date()
        //   }
        // });

        // // Add a new empty daily. 
        // Dailies.insert({});

         // handle success depending what you need to do
        //var userId = Meteor.userId();

        // ImageStore.on('stored', function(storeName, fileObj) {
      //   console.log('hello stored');
      // });

      // Timer every 1 second
        // var intervalHandle = Meteor.setInterval(function () {
        //     console.log("Inside interval");
        //     fileObj.hasStored()
        //     if (fileObj.hasStored("ImageStore")) {
        //         console.log('stored');

        //         // file has stored, close out interval
        //         Meteor.clearInterval(intervalHandle);
        //     }
        //     else {
        //       console.log('not stored');
        //     }
        // }, 1000);
        
      //}


      

    //});

    // @todo: Use a meteor method instead of this, which is calling directly from
    // the client without any security.
    Dailies.update(id, {
      $set: {
        image: fileObj,
        createdAt: new Date()
      }
    });

    // Add a new empty daily. 
    Dailies.insert({});
  },

  renderImage() {
    var file = Images.findOne({'_id': this.props.daily.image._id});
    return (
      <span className="url">
         <img src={file.url()} />
      </span>
    );
  },

  renderForm() {
    return (
      <form className="image-upload" >
        <input
        type="file"
        ref="fileInput" 
        onChange={this.handleChange} />
      </form>
    );
  },

  render() {
    return (
      <div>
        {this.props.daily.image ? this.renderImage() : this.renderForm()}
      </div>
    );
  }
});
