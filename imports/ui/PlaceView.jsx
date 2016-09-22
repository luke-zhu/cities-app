import React, { propTypes } from 'react';

const PlaceView = ({ place }) => (
  <h4>place</h4>
);

PlaceView.propTypes = {
  place: PropTypes.string.isRequired,
}

export default PlaceView;
