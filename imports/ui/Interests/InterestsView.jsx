import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import GamingView from './GamingView.jsx';
import MoviesView from './MoviesView.jsx';
import ExerciseView from './ExerciseView.jsx';
import { switchInterestsTabs } from '../redux/actions.js';

// Note: interests are filtered at mapStateToProps
const InterestsView = ({ interests, interestsTab, handleSelect }) => {
  const navItems = [];
  interests.forEach((e, i) => {
    // Add navItems and view.
    navItems.push(
      <NavItem eventKey={interests[i]}>
        {interests[i]}
      </NavItem>
    );
  });
  const view = [];
  switch (interestsTab) {
    case 'Gaming':
      view.push(<GamingView key={interestsTab} />);
      break;
    case 'Movies':
      view.push(<MoviesView key={interestsTab} />);
      break;
    case 'Exercise':
      view.push(<ExerciseView key={interestsTab} />);
      break;
    default:
      view.push(<h3 key={interestsTab}>{interestsTab}</h3>);
  }
  return (
    <div>
      <Nav
        bsStyle="pills"
        activeKey={interestsTab}
        onSelect={handleSelect}
      >
        {navItems}
      </Nav>
      {view}
    </div>
  );
};

InterestsView.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  interestsTab: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  interests: state.interests,
  interestsTab: state.interestsTab,
});

const mapDispatchToProps = dispatch => ({
  handleSelect: key => dispatch(switchInterestsTabs(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestsView);
