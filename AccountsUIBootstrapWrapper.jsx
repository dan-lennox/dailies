// Load a regular blaze component.
var LoginButtons = RouteCore.BlazeComponent('accounts-ui-bootstrap-wrapper');

AccountsUIBootstrapWrapper = React.createClass({
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    return (
      <div className="navbar navbar-default" role="navigation">
      <div className="navbar-header">
          <a className="navbar-brand" href="#">Project name</a>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
      </div>
      <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
              <LoginButtons />
          </ul>
      </div>
    </div>
    )
  }
});