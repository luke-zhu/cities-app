import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { changePlaces } from './redux/actions.js';

const capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const UncontainedHobbyView = ({ name, places }) => {
  const rows = places.filter(elem => elem[1] === name).map(elem => <h6>{elem[0]}</h6>);
  return (
    <div>
      <h3>{capitalize(name)}</h3>
      <div>{rows}</div>
    </div>
  );
};

UncontainedHobbyView.propTypes = {
  name: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  places: state.places,
  updatePlaces: state.updatePlaces,
});

const mapDispatchToProps = dispatch => ({
  handlePlaces: places => dispatch(changePlaces(places)),
});

const HobbyView = connect(mapStateToProps, mapDispatchToProps)(UncontainedHobbyView);

export default HobbyView;
