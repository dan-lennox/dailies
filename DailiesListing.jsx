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
    // Add an initial empty daily if no other's are available.
    //console.log(Dailies.find().fetch().length);
    if(Dailies.find().count() == 0) {
      Meteor.call('addDaily');
    }

    return {
      dailies: Dailies.find().fetch()
    }
  },

  render() {

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