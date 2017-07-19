import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import Slider from 'rc-slider';
import { ThreeBounce } from 'better-react-spinkit'

import * as actions from '../redux/actions';
import DraggableSidebarEvent from './DraggableSidebarEvent';
import 'react-select/dist/react-select.css';
import 'rc-slider/assets/index.css';

const CATEGORIES = [
  { label: 'Academic Calendar', value: 'Academic Calendar' },
  { label: 'Arts and Humanities', value: 'Arts and Humanities' },
  { label: 'Athletics and Recreation', value: 'Athletics and Recreation' },
  { label: 'Entrepreneurship', value: 'Business and Entrepreneurship' },
  { label: 'Career', value: 'Career and Professional Services' },
	{ label: 'Cultural and International', value: 'Cultural and International' },
	{ label: 'Diversity and Inclusion', value: 'Diversity and Inclusion' },
	{ label: 'Health and Medicine', value: 'Health and Medicine' },
	{ label: 'Law, Politics, and Society', value: 'Law, Politics, and Society' },
	{ label: 'Libraries, Museums, and Galleries', value: 'Libraries, Museums, and Galleries' },
  { label: 'Science and Technology', value: 'Science and Technology' },
  { label: 'Social Sciences', value: 'Social Sciences' },
  { label: 'Spiritual and Religious', value: 'Spiritual and Religious' },
  { label: 'Student Life', value: 'University Events' },
	{ label: 'Yale and New Haven', value: 'Yale and New Haven' },
];

const TooltipSlider = Slider.createSliderWithTooltip(Slider);

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: CATEGORIES,
			selectedCategories: [],
      selectedNumber: 10
    };
  }

  async componentDidMount() {
    this.setState({  isLoading: true });
    await this.props.fetchEvents();
    this.setState({ isLoading: false });
  }

  loadEvents() {
    return _.map(this.props.events, event => {
      return (
        <DraggableSidebarEvent event={event} key={event.id} />
      )
    })
  }

	async handleSelectChange(value) {
    console.log([value])
		this.setState({ selectedCategories: value, isLoading: true });
    await this.props.fetchEvents({
      categories: [value],
      number: this.state.selectedNumber
    });
    this.setState({ isLoading: false });
	}

  async handleSliderChange(value) {
    if(value !== this.state.selectedNumber) {
      this.setState({ selectedNumber: value, isLoading: true });
      await this.props.fetchEvents({
        categories: this.state.selectedCategories,
        number: value
      });
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div id='events'>
  			<h3>Search Events</h3>
        <label>Categories</label>
        <Select multi simpleValue value={this.state.selectedCategories} placeholder='Select Categories' options={this.state.options} onChange={this.handleSelectChange.bind(this)} />
        <label>Number of Events</label>
        <TooltipSlider min={1} max={50} defaultValue={10} trackStyle={{ backgroundColor: '#3174ad' }} handleStyle={[{ borderColor: '#3174ad' }]} onAfterChange={this.handleSliderChange.bind(this)} />
        {this.state.isLoading ? <center><ThreeBounce size={20} color='#3174ad' /></center> : this.loadEvents() }
  		</div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps, actions)(Sidebar);
