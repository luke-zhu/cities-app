import React, { PropTypes } from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import CompaniesForm from './Companies/CompaniesForm.jsx';
import InterestsForm from './Interests/InterestsForm.jsx';
import { changeLocation, getGeocode } from './redux/actions.js';

// A form made with react-bootstrap
// ControlLabel is a label
// FormControl is a input
// See PropTypes for prop data
const InputForm = ({ state, handleLocChange, handleReturn }) => (
  <div className="input">
    <div className="container">
      {state.lastInput ?
        <h1>&#8706;Offers/&#8706;{state.selectedTab}</h1> :
        <h1>&#8706;Offers</h1>}
      <AccountsUIWrapper />
      <form>
        <FormGroup
          controlId="formLocationText"
          validationState={state.geocodeError ? 'error' : null}
        >
          <ControlLabel>Location</ControlLabel>
          <FormControl
            type="text"
            placeholder="Ex: San Francisco"
            value={state.location}
            onChange={handleLocChange}
            onKeyPress={handleReturn(state)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <CompaniesForm
          location={state.location}
        />
        <InterestsForm lat={state.lat} lng={state.lng} />
      </form>
    </div>
  </div>
);


InputForm.propTypes = {
  state: PropTypes.object.isRequired, // Location state prop
  handleLocChange: PropTypes.func.isRequired, // Changes the location prop when input is changed
  handleReturn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  handleLocChange: e => dispatch(changeLocation(e.target.value)),
  handleReturn: state => (
    (e) => {
      if (e.key === 'Enter') {
        dispatch(getGeocode(state));
      }
    }
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
