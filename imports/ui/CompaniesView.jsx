import React, { PropTypes} from 'react';
import { connect } from 'react-redux';

const UncontainedCompaniesView = ({ companies }) => (
  <h6>{companies}</h6>
);

UncontainedCompaniesView.propTypes = {
  companies: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  companies: state.companies,
});

const CompaniesView = connect(mapStateToProps)(UncontainedCompaniesView);

export default CompaniesView;

