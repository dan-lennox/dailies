//Needed for onTouchTap
//Can go away when react 1.0 release
injectTapEventPlugin();
console.log('run');

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

// App component - represents the whole app
App = React.createClass({

  mixins: [ReactMeteorData],
  
  getMeteorData() {
    return {
      loggedIn: Meteor.userId()
    };
  },

  _handleClick(e) {
    e.preventDefault();
    // Show/Hide the LeftMenu
    this.refs.leftNav.toggle();
  },

  _handleMenuItemClick(event, selectedIndex, menuItem) {
    // Feed the leftNav material ui MenuItem route into flowrouter.
    FlowRouter.go(menuItem.route);
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

  /**
   * Return an array of menu items.
   */
  _getMenuItems() {
    let MenuItems = [];

    MenuItems.push({ route: '/', text: 'Home'});

    if (Meteor.userId()) {
      MenuItems.push({ route: 'logout', text: 'Log Out' });
    }
    else {
      MenuItems.push({ route: 'login', text: 'Log In'});
    }

    return MenuItems;
  },

  render() {
    return (
      <AppCanvas>
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={this._getMenuItems()}
          onChange={this._handleMenuItemClick} />

        <AppBar title="Dailies" onLeftIconButtonTouchTap={this._handleClick} />
        
        {this.props.content()}

      </AppCanvas>
    );
  }
});