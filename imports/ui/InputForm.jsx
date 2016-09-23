import React, { PropTypes } from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import CompaniesForm from './Companies/CompaniesForm.jsx';
import InterestsForm from './Interests/InterestsForm.jsx';
import { changeLocation, getGeocode } from './redux/actions.js';

// A form made with react-bootstrap
// ControlLabel is a label
// FormControl is a input
// See PropTypes for prop data
const InputForm = ({ location, handleLocChange, handleReturn }) => (
  <form>
    <FormGroup>
      <ControlLabel>Location</ControlLabel>
      <FormControl
        type="text"
        placeholder="Ex: San Francisco"
        value={location}
        onChange={handleLocChange}
        onKeyPress={handleReturn(location)}
      />
    </FormGroup>
    <CompaniesForm />
    <InterestsForm />
  </form>
);


InputForm.propTypes = {
  location: PropTypes.string.isRequired, // Location state prop
  handleLocChange: PropTypes.func.isRequired, // Changes the location prop when input is changed
  handleReturn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  handleLocChange: e => dispatch(changeLocation(e.target.value)),
  handleReturn: location => (
    (e) => {
      if (e.key === 'Enter') {
        console.log('Location entered!');
        dispatch(getGeocode(location));
      }
    }
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
