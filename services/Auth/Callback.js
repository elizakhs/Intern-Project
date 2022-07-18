import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    // handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("invalid callback url");
    }
  }

  render() {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Callback;
