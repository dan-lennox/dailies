

var {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  DatePicker
  } = MUI;
var { ThemeManager, LightRawTheme } = Styles;

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(App, {
      content() {
        return <App />;
      }
    });
  }
});

// App component - represents the whole app
App = React.createClass({


  //This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      dailies: Dailies.find({}).fetch()
    }
  },

  // Material UI code. See https://github.com/mrphu3074/react-material-ui/
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  // Material UI code. See https://github.com/mrphu3074/react-material-ui/
  getChildContext() {
      return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
      };
  },

  renderDailies() {
    return this.data.dailies.map((daily) => {
      return <Daily key={daily._id} daily={daily} />;
    });
  },

  render() {
    return (
      <AppCanvas>
        <AppBar 
          title="Dailies"
          // iconElementRight = {
          //   <MUI.IconMenu iconButtonElement={
          //     <MUI.IconButton><MUI.MoreVertIcon /></MUI.IconButton>
          //   }>
          //     <MUI.MenuItem primaryText="Refresh" />
          //     <MUI.MenuItem primaryText="Help" />
          //     <MUI.MenuItem primaryText="Sign out" />
          //   </MUI.IconMenu>
          // } 
        />
        
        <div className="container">
          {this.renderDailies()}
       </div>
      </AppCanvas>
    );
  }
});