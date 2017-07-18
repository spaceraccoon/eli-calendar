import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class Sidebar extends Component {
  renderEvents() {
    if(!this.props.events.length) {
      return 'Loading events...'
    }
    return _.map(this.props.events, event => {
      return (
        <li className="list-group-item" key={event.title}>
          {event.title}
        </li>
      )
    })
  }

  render() {
    return <div id='external-events'>
			<h3>Events</h3>
      <ul className="list-group">
          {this.renderEvents()}
        </ul>
		</div>;
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Sidebar);
