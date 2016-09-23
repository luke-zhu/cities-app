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

const CompaniesForm = ({ location, company, handleChange, handleReturn }) => (
  <FormGroup>
    <ControlLabel>Company</ControlLabel>
    <FormControl
      type="text"
      placeholder="Ex: McDonalds"
      value={company}
      onChange={handleChange}
      onKeyPress={handleReturn(location, company)}
    />
  </FormGroup>
);

CompaniesForm.propTypes = {
  location: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  handleReturn: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
  company: state.company,
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
