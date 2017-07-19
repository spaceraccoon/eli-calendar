import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import { ThreeBounce } from 'better-react-spinkit';
import Slider from 'react-slider';

import * as actions from '../redux/actions';
import DraggableSidebarEvent from './DraggableSidebarEvent';
import './Sidebar.css';

const CATEGORIES = [
  { label: 'Academic Calendar', value: 'Academic Calendar' },
  { label: 'Arts and Humanities', value: 'Arts and Humanities' },
  { label: 'Athletics and Recreation', value: 'Athletics and Recreation' },
  { label: 'Entrepreneurship', value: 'Business and Entrepreneurship' },
  { label: 'Career', value: 'Career and Professional Services' },
	{ label: 'Cultural and International', value: 'Cultural and International' },
	{ label: 'Diversity and Inclusion', value: 'Diversity and Inclusion' },
	{ label: 'Health and Medicine', value: 'Health and Medicine' },
	{ label: 'Law, Politics and Society', value: 'Law, Politics and Society' },
	{ label: 'Libraries, Museums, and Galleries', value: 'Libraries, Museums, and Galleries' },
  { label: 'Science and Technology', value: 'Science and Technology' },
  { label: 'Social Sciences', value: 'Social Sciences' },
  { label: 'Spiritual and Religious', value: 'Spiritual and Religious' },
  { label: 'Student Life', value: 'University Events' },
	{ label: 'Yale and New Haven', value: 'Yale and New Haven' },
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: CATEGORIES,
			selectedCategories: [],
      currentNumber: 10,
      selectedNumber: 10,
      searchValue: ''
    };
  }

  async reloadEvents() {
    this.setState({ isLoading: true });
    await this.props.fetchEvents({
      categories: this.state.selectedCategories.map((category) => category.value),
      number: this.state.selectedNumber,
      search: this.state.searchValue
    });
    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    await this.reloadEvents();
  }

  loadEvents() {
    return _.map(this.props.events, event => {
      return (
        <DraggableSidebarEvent event={event} key={event.id} />
      )
    })
  }

  async handleSearchChange(event) {
    await this.setState({ searchValue: event.target.value });
    this.reloadEvents();
  }

	async handleSelectChange(value) {
		await this.setState({ selectedCategories: value });
    this.reloadEvents();
	}

  handleSliderChange(value) {
    this.setState({ currentNumber: value });
  }

  async handleSliderAfterChange(value) {
    if(value !== this.state.selectedNumber) {
      await this.setState({ selectedNumber: value });
      this.reloadEvents();
    }
  }

  render() {
    return (
      <div id='events'>
  			<h3>Select Events</h3>
        <label>Search</label>
        <input type="text" value={this.state.searchValue} onChange={this.handleSearchChange.bind(this)} />
        <label>Categories</label>
        <Select
          multi
          value={this.state.selectedCategories}
          placeholder='Select Categories'
          options={this.state.options}
          onChange={this.handleSelectChange.bind(this)}
        />
        <label>Number of Events</label>
        <Slider
          min={1}
          max={50}
          defaultValue={10}
          handleClassName={'slider-handle'}
          withBars
          barClassName={'slider-track'}
          onAfterChange={this.handleSliderAfterChange.bind(this)}
          onChange={this.handleSliderChange.bind(this)}
        >
          <div className="slider-handle-inner">{this.state.currentNumber}</div>
        </Slider>
        <label>Events</label>
        {this.state.isLoading ? <center><ThreeBounce size={20} color='#3174ad' /></center> : this.loadEvents() }
  		</div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps, actions)(Sidebar);
