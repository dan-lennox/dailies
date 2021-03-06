const {
  Styles,
  GridList
} = MUI;
const { ThemeManager, LightRawTheme } = Styles;

const gridListStyle = {display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'};

DailiesListing = React.createClass({

  //This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {

    var handle = Meteor.subscribe("Dailies", Meteor.userId());

    var dailies = Dailies.find().fetch();

    // @TODO: Is this the best place for this logic? Or should we only
    // be preparing React props here, with this logic placed elsewhere?
    if (handle.ready()) {
      if(dailies.length == 0 && Meteor.userId()) {
        // Add an initial empty daily if no other's are available.
        Meteor.call('addDaily');
      }

      // Is it a different day?
      let today = new Date();
      var latestDaily = dailies[dailies.length - 1];
      if (latestDaily) {
        var latestDate = new Date(latestDaily.date);
        // Uncomment below to debug "tomorrow"
        //if ((today.getDay() + 1) != latestDaily.getDay()) {
        if (today.getDay() != latestDate.getDay()) {
          if (Meteor.userId()) {
            Meteor.call('addDaily');
          }
        }
      }
    }

    return {
      dailies: dailies,
      dailiesLoading: ! handle.ready(),
    }
  },

  render() {

    // Show a loading indicator if data is not ready
    if (this.data.dailiesLoading) {
      return <SpinnerView />;
    }

    var dailies = this.data.dailies.map((daily) => {
      return <Daily key={daily._id} daily={daily} />;
    });

    return (
      <div>
        <MediaQuery query={'(max-width: 1024px)'}>
          <GridList
            cellHeight={170}
            style={gridListStyle}
            cols={4}
            >
            {dailies}
          </GridList>
        </MediaQuery>
        
        <MediaQuery query={'(min-width: 1023px)'}>
          <GridList
            cellHeight={190}
            style={gridListStyle}
            cols={6}
            >
            {dailies}
          </GridList>
        </MediaQuery>
      </div>
    );
  }
});