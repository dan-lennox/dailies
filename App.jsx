injectTapEventPlugin();

const {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  DatePicker,
  IconMenu,
  IconButton,
  Menu,
  MenuItem,
  MoreVertIcon,
  FlatButton,
  LeftNav
} = MUI;
const { ThemeManager, LightRawTheme } = Styles;

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    //The key 'content' is now a function 
    ReactLayout.render(App, {
      content() {
        return <App />;
      }
    });
  }
});

// Define menu items for LeftNav
const menuItems = [
  { route: '/', text: 'Home' },
  { route: 'about', text: 'About' },
  { route: 'contact', text: 'Contact' },
];

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

  _handleClick(e) {
    e.preventDefault();
 
    // Show/Hide the LeftMenu
    this.refs.leftNav.toggle();
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
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems} />

        <AppBar title="Dailies" onLeftIconButtonTouchTap={this._handleClick} />
        
        {this.renderDailies()}
      </AppCanvas>
    );
  }
});