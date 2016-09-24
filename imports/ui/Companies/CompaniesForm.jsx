import React, { PropTypes } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  getCompanyData,
  changeCompany,
} from '../redux/actions.js';

const CompaniesForm = ({ location, company, handleChange, handleReturn, glassdoorError }) => (
  <FormGroup
    controlId="formCompanyText"
    validationState={glassdoorError ? 'error' : null}
  >
    <ControlLabel>Company</ControlLabel>
    <FormControl
      type="text"
      placeholder="Ex: McDonalds"
      value={company}
      onChange={handleChange}
      onKeyPress={handleReturn(location, company)}
    />
    <FormControl.Feedback />
  </FormGroup>
);

CompaniesForm.propTypes = {
  location: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  handleReturn: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  glassdoorError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  company: state.company,
  glassdoorError: state.glassdoorError,
});

const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(changeCompany(e.target.value)),
  handleReturn: (location, company) => (
    (e) => {
      if (e.key === 'Enter') {
        dispatch(getCompanyData(location, company));
      }
    }
  ),
});

export default connect(
  mapStateToProps, mapDispatchToProps
  )(CompaniesForm);
