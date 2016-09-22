import React, { PropTypes } from 'react';
import {
  // Button,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeLocation, startUpdate } from './redux/actions.js';

// A form made with react-boostrap
// ControlLabel is a label
// FormControl is a input
// See PropTypes for prop data
const UncontaintedInputForm = ({ location, handleLocChange, handleReturn }) => (
  <form>
    <FormGroup>
      <ControlLabel>Location</ControlLabel>
      <FormControl
        type="text"
        placeholder="Ex: San Francisco"
        value={location}
        onChange={handleLocChange}
        onKeyPress={handleReturn}
      />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Company</ControlLabel>
      <FormControl
        type="text"
        placeholder="Ex: McDonalds"
      />
      <ControlLabel>Salary</ControlLabel>
      <FormControl
        type="number"
        placeholder="Ex: 10000"
      />
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Interests</ControlLabel>
      <FormControl
        componentClass="select"
        multiple
      >
        <option value="exercise">Exercise</option>
        <option value="gaming">Gaming</option>
        <option value="food">Food</option>
        <option value="movies">Movies</option>
        <option value="music">Music</option>
        <option value="shopping">Shopping</option>
        <option value="sports">Sports</option>
        <option value="traveling">Travel</option>
      </FormControl>
    </FormGroup>
  </form>
);


UncontaintedInputForm.propTypes = {
  location: PropTypes.string.isRequired, // Location state prop
  // handleHobbiesChange: PropTypes.func.isRequired,
  handleLocChange: PropTypes.func.isRequired, // Changes the location prop when input is changed
  handleReturn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  handleLocChange: e => dispatch(changeLocation(e.target.value)),
  /*
  handleHobbiesChange: (e) => {
    const selectedOptions = [];
    for (let i = 0; i < e.target.options.length; i += 1) {
      const option = e.target.options[i];
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    dispatch(changeHobbies(selectedOptions));
  },
  */
  handleReturn: (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      dispatch(startUpdate('updateGeocode'));
    }
  },
});

const InputForm = connect(mapStateToProps, mapDispatchToProps)(UncontaintedInputForm);

export default InputForm;
