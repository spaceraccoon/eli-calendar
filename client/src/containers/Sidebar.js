import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return <div id='external-events'>
			<h3>Events</h3>
			<div className='fc-event'>My Event 1</div>
			<div className='fc-event'>My Event 2</div>
			<div className='fc-event'>My Event 3</div>
			<div className='fc-event'>My Event 4</div>
			<div className='fc-event'>My Event 5</div>
		</div>;
  }
}

export default Sidebar;
