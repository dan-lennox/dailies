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
        return <DailiesListing />;
      }
    });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function(params) {
    //The key 'content' is now a function 
    ReactLayout.render(App, {
      content() {
        return <Accounts.ui.LoginFormSet />
      }
    });
  }
});

FlowRouter.route('/logout', {
  triggersEnter: [function(context, redirect) {
    Meteor.logout();
    FlowRouter.go('/login');
  }],
});


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

  _getMenuItems() {
    let MenuItems = [];
    MenuItems.push({ type: MenuItem.Types.LINK, payload: '/', text: 'Home' });

    if (Meteor.userId()) {
      MenuItems.push({ type: MenuItem.Types.LINK, payload: 'logout', text: 'Log Out' });
    }
    else {
      MenuItems.push({ type: MenuItem.Types.LINK, payload: 'login', text: 'Log In' });
    }
    
    return MenuItems;
  },

  render() {
    return (

      <AppCanvas>
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={this._getMenuItems()} />

        <AppBar title="Dailies" onLeftIconButtonTouchTap={this._handleClick} />
        
        {this.props.content()}

      </AppCanvas>
    );
  }
});