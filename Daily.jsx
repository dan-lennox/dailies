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

    Images.insert(file, function (err, fileObj) {
      if (err){
         // handle error
      } else {
        console.log('insert called');
         // handle success depending what you need to do
        //var userId = Meteor.userId();
        let imageUrl = "/cfs/files/images/" + fileObj._id;
        //Meteor.users.update(userId, {$set: imagesURL});
        //console.log(this.props.daily._id);
        console.log(id._str);

        // @todo: Use a meteor method instead of this, which is calling directly from
        // the client without any security.
        Dailies.update(id, {
          $set: {
            imageUrl: imageUrl,
            createdAt: new Date()
          }
        });

        // Add a new empty daily. 
        Dailies.insert({});
      }
    });
     //});
  },

  renderImage() {
    console.log(this.props.daily);
    return (
      <span className="url">
         <img src={this.props.daily.imageUrl} />
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
        {this.props.daily.imageUrl ? this.renderImage() : this.renderForm()}
      </div>
    );
  }
});