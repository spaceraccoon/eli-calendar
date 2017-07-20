import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ThreeBounce } from 'better-react-spinkit';
import { Link } from 'react-router-dom';
import {
  Button,
  Colors
} from 'react-foundation';
import AddToCalendar from 'react-add-to-calendar';

import "react-add-to-calendar/dist/react-add-to-calendar.css";
import * as actions from '../redux/actions';

class Event extends Component {
  handleAddClick() {
    let event = this.props.events[this.props.match.params.eventId];
    this.props.moveEvent({ event });
    this.props.history.push('/');
  }

  handleDeleteClick() {
    let event = this.props.events[this.props.match.params.eventId];
    this.props.deleteEvent({ event });
    this.props.history.push('/');
  }

  loadEvent() {
    if (_.isEmpty(this.props.events))
      return <center><ThreeBounce size={20} color='#3174ad' /></center>

    let {
      title,
      start,
      end,
      formattedDate,
      location,
      description,
      contact
    } = this.props.events[this.props.match.params.eventId];

    let exportEvent = {
      title,
      description,
      location: `${location.address}, ${location.street}, ${location.city}`,
      startTime: start,
      endTime: end
    }

    return (
      <div>
        <h2>{ title }</h2>
        <ul>
          <li><strong>When: </strong>{ formattedDate }</li>
          <li><strong>Where: </strong></li>
          <ul>
            <li>{ location.address }</li>
            <li>{ location.room }</li>
            <li>{ location.street }</li>
          </ul>
          <li><strong>Description: </strong>{ description }</li>
          <li><strong>Contact: </strong></li>
          <ul>
            <li>{ contact.name }</li>
            <li>{ contact.phone }</li>
            <li>{ contact.email }</li>
            <li><a href={ contact.link }>{ contact.link }</a></li>
          </ul>
        </ul>
        <Link to='/' className='secondary'><Button color={Colors.SECONDARY}>Back</Button></Link>
        <AddToCalendar
          event={exportEvent}
          buttonLabel="Export Event"
        />
        { this.props.selectedEvents[this.props.match.params.eventId] ?
          <Button onClick={this.handleDeleteClick.bind(this)} color={Colors.ALERT}>Delete from Calendar</Button> :
          <Button onClick={this.handleAddClick.bind(this)}>Add to Calendar</Button>
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.loadEvent()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    selectedEvents: state.selectedEvents
  };
}

export default connect(mapStateToProps, actions)(Event);
