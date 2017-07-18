import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import DraggableEvent from './DraggableEvent';

class Sidebar extends Component {
  renderEvents() {
    if(!this.props.events.length) {
      return 'Loading events...'
    }
    return _.map(this.props.events, event => {
      return (
        <DraggableEvent event={event} key={event.id} />
      )
    })
  }

  render() {
    return (
      <div id='events'>
  			<h3>Events</h3>
        {this.renderEvents()}
  		</div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Sidebar);
