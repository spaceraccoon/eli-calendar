import React, { Component } from 'react';
import { connect } from 'react-redux';

class Event extends Component {
  render() {
    return <h3>{this.props.match.params.eventId}</h3>
  }
}

function mapStateToProps(state) {
  return {
    event: state.selectedEvent[this.props.match.params.eventId]
  };
}

export default connect (mapStateToProps)(Event);
