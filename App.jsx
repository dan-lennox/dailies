// App component - represents the whole app
App = React.createClass({

   // This mixin makes the getMeteorData method work
  //mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  //getMeteorData() {
    // @todo
  //},

  renderImages() {
    // @todo
  },

  render() {
    return (
      <div className="container">
        <div>
          <AccountsUIBootstrapWrapper />
        </div>
        <div>
          // Test one with state full.
          <DailyImage />
        </div>
        <div>
          // Test one with state empty.
          <DailyImage />
        </div>
        // TODO: Replace with renderImage().
      </div>
    );
  }
});