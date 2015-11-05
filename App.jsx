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

  renderDailies() {
    return this.data.dailies.map((daily) => {
      return <Daily key={daily._id} daily={daily} />;
    });
  },

  render() {
    return (
      <div className="container">
        <div>
          <AccountsUIBootstrapWrapper />
        </div>
        <div>
          {this.renderDailies()}
        </div>
      </div>
    );
  }
});