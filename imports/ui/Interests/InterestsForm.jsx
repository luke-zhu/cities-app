import React, { PropTypes } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeInterests } from '../redux/actions.js';

const InterestForm = ({ lat, lng, received, handleChange }) => (
  <FormGroup controlId="formControlsSelectMultiple">
    <ControlLabel>Interests</ControlLabel>
    <FormControl
      componentClass="select"
      onChange={handleChange(lat, lng, received)}
      multiple
    >
      <option value="Exercise">Exercise</option>
      <option value="Gaming">Gaming</option>
      <option value="Food">Food</option>
      <option value="Movies">Movies</option>
      <option value="Music">Music</option>
      <option value="Shopping">Shopping</option>
      <option value="Sports">Sports</option>
      <option value="Traveling">Travel</option>
    </FormControl>
  </FormGroup>
);

InterestForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  received: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  received: state.received,
});

const mapDispatchToProps = dispatch => ({
  handleChange: (lat, lng, received) => (e) => {
    const selectedOptions = [];
    for (let i = 0; i < e.target.options.length; i += 1) {
      const option = e.target.options[i];
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    dispatch(changeInterests(selectedOptions, lat, lng, received));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestForm);
