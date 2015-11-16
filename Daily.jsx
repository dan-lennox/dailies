// Daily component.
Daily = React.createClass({

  propTypes: {
    // State empty (db stored) / filled (db stored) / edit (temporary stored)
    daily: React.PropTypes.object.isRequired,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {

    let query = {};

    if (this.props.daily.image) {
      query = {'_id': this.props.daily.image._id};
    }

    return {
      file: Images.findOne(query)
    };
  },

  handleChange(event) {
    event.preventDefault();
 
    var file = event.target.files[0];
    var id = this.props.daily._id;

    // Insert the file.
    var thisFile = Images.insert(file);

    Dailies.update(id, {
      $set: {
        image: thisFile,
        createdAt: new Date()
      }
    });
    //Add a new empty daily. 
    Dailies.insert({});
    
  },

  renderImage() {
    return (
      <span className="url">
         <img src={this.data.file.url()} />
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
