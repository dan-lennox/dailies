// Routes.
// TODO: Work out convention here.. should this be stored in another file?

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    //The key 'content' is now a function 
    ReactLayout.render(App, {
      content() {
        return <div><DailiesListing /></div>;
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
  name: 'logout',
  triggersEnter: [function(context, redirect) {
    Meteor.logout();
    FlowRouter.go('/login');
  }],
});