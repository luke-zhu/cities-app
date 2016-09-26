import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import GamingView from './GamingView.jsx';
import MoviesView from './MoviesView.jsx';
import ExerciseView from './ExerciseView.jsx';

const InterestsView = ({ interests }) => {
  const rows = [];
  for (let i = 0; i < interests.length; i += 1) {
    switch (interests[i]) {
      case 'Gaming':
        rows.push(<GamingView key={interests[i]} />);
        break;
      case 'Movies':
        rows.push(<MoviesView key={interests[i]} />);
        break;
      case 'Exercise':
        rows.push(<ExerciseView key={interests[i]} />);
        break;
      default:
        rows.push(<h3 key={interests[i]}>{interests[i]}</h3>);
    }
  }
  return (
    <div>
      {rows}
    </div>
  );
};

InterestsView.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = state => ({
  interests: state.interests,
});

export default connect(mapStateToProps)(InterestsView);
