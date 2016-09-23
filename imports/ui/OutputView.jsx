import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import InterestsView from './Interests/InterestsView.jsx';
import CompaniesView from './Companies/CompaniesView.jsx';

const OutputView = ({ location, heading }) => (
  <div className="jumbotron">
    <h3>{location === '' ? heading : location}</h3>
    <CompaniesView />
    <InterestsView />
  </div>
);

OutputView.propTypes = {
  location: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
  heading: state.heading,
});

export default connect(mapStateToProps)(OutputView);
