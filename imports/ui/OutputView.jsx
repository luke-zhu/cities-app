import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import InterestsView from './Interests/InterestsView.jsx';
import CompaniesView from './Companies/CompaniesView.jsx';
import { switchTabs } from './redux/actions.js';

const OutputView = ({ selectedTab, location, heading, handleSelect, tempHigh, tempLow }) => (
  <div className="container">
    <h3>{location === '' ? heading : location}</h3>
    {!isNaN(tempHigh) ?
      <h4>Average High: {tempHigh}&deg;F Average Low: {tempLow}&deg;F</h4> :
      null}
    <Nav
      bsStyle="tabs"
      activeKey={selectedTab}
      onSelect={handleSelect}
    >
      <NavItem eventKey={'Company'}>Companies</NavItem>
      <NavItem eventKey={'Interests'}>Interests</NavItem>
    </Nav>
    {selectedTab === 'Company' ? <CompaniesView /> : null}
    {selectedTab === 'Interests' ? <InterestsView /> : null}
  </div>
);

OutputView.propTypes = {
  location: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  tempHigh: PropTypes.number.isRequired,
  tempLow: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
  heading: state.heading,
  selectedTab: state.selectedTab,
  tempHigh: state.tempHigh,
  tempLow: state.tempLow,
});

const mapDispatchToProps = dispatch => ({
  handleSelect: key => dispatch(switchTabs(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutputView);
