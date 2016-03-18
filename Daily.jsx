const {
  Styles,
  GridTile,
  IconButton,
  StarBorder
} = MUI;
const { ThemeManager, LightRawTheme } = Styles;

const gridListItemStyle = {flexShrink: 0, flexGrow: 0, marginTop: '70px'};

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

  _handleChange(event) {
    event.preventDefault();
 
    var file = event.target.files[0];
    var id = this.props.daily._id;

    // Insert the file in the FS.collection
    var thisFile = Images.insert(file);
    // Update the Daily in the database.
    Meteor.call('updateDaily', id, thisFile);
    // Create a new empty daily (next day);
    // @TODO: Replace with time/calander based adding of next daily.
    Meteor.call('addDaily');
  },

  renderImage() {
    return (
      <GridTile 
        key={this.props.daily.image._id}
        title={'21st Jan'}
        subtitle={<span>{'by'} <b>{'well done'}</b></span>}
        style={gridListItemStyle}
      >
        <img src={this.data.file.url()} />
      }
      </GridTile>
    );
  },

  renderForm() {
    return (
      <GridTile 
        key={'new-or-edit'}
        style={gridListItemStyle}
      >
        <form className="image-upload" >
          <input
          type="file"
          ref="fileInput" 
          onChange={this._handleChange} />
        </form>
      </GridTile>
    );
  },

  render() {
    return this.props.daily.image ? this.renderImage() : this.renderForm()
  }
});
