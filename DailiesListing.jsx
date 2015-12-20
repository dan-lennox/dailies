DailiesListing = React.createClass({

  //This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      dailies: Dailies.find({}).fetch()
    }
  },

  render() {
    // TODO: this should be something more like.
    // Meteor.subscribe('blogPost', params.postId)); to get the list of dailies.
    var dailies = this.data.dailies.map((daily) => {
      return <Daily key={daily._id} daily={daily} />;
    });
    return <div>{dailies}</div>;
  }
});