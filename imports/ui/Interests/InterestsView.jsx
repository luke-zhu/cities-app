import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import GamingView from './GamingView.jsx';
import MoviesView from './MoviesView.jsx';
import ExerciseView from './ExerciseView.jsx';
import TravelView from './TravelView.jsx';
import MusicView from './MusicView.jsx';
import { switchInterestsTabs } from '../redux/actions.js';

// Note: interests are filtered at mapStateToProps
const InterestsView = ({ interests, interestsTab, handleSelect }) => {
  const navItems = [];
  interests.forEach((e, i) => {
    // Add navItems and view.
    navItems.push(
      <NavItem eventKey={interests[i]} key={interests[i]}>
        {interests[i]}
      </NavItem>
    );
  });
  let view;
  switch (interestsTab) {
    case 'Gaming':
      view = <GamingView key={interestsTab} />;
      break;
    case 'Movies':
      view = <MoviesView key={interestsTab} />;
      break;
    case 'Exercise':
      view = <ExerciseView key={interestsTab} />;
      break;
    case 'Travel':
      view = <TravelView key={interestsTab} />;
      break;
    case 'Music':
      view = <MusicView key={interestsTab} />;
      break;
    default:
      view = <h3 key={interestsTab}>{interestsTab}</h3>;
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
