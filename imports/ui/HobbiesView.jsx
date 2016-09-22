import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

import { changeGeocode, changeHobbies, changePlaces } from './redux/actions.js';
import HobbyView from './HobbyView.jsx';

// Our ugly af async mess
// get GoogleGeo

const getGooglePlaces = (name, lat, lng, handlePlaces) => {
  Meteor.call('restAPI.getGooglePlaces', name, lat, lng,
    (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response.data.results);
        handlePlaces(name, response.data.results);
      }
    }
  );
};

const getYelpPlaces = (name, lat, lng, handlePlaces) => {
  Meteor.call('restAPI.getYelpPlaces', name, lat, lng,
    (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response.data.businesses);
        handlePlaces(name, response.data.businesses);
      }
    }
  );
};

const getGoogleGeocode = (location, hobbies, handleGeocode, handlePlaces) => {
  HTTP.get(
    'https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
        address: location,
        key: Meteor.settings.public.google.apiKey,
      },
    }, (error, response) => {
      if (!error) {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        handleGeocode(lat, lng);
        for (let i = 0; i < hobbies.length; i += 1) {
          getGooglePlaces(hobbies[i], lat, lng, handlePlaces);
          getYelpPlaces(hobbies[i], lat, lng, handlePlaces);
        }
      }
    }
  );
};

const UncontainedHobbiesView = ({ location, hobbies, lat, lng, updateGeocode, updateHobbies, handleGeocode, handleHobbies, handlePlaces }) => {
  /*
  if (updateHobbies) {
    handleHobbies(hobbies);
  } else if (updateGeocode) {
    getGoogleGeocode(location, hobbies, handleGeocode, handlePlaces);
  }
  */
  const rows = [];
  for (let i = 0; i < hobbies.length; i += 1) {
    rows.push(<HobbyView name={hobbies[i]} lat={lat} lng={lng} />);
  }
  return (
    <div className="jumbotron">
      <h3>{location}</h3>
      <h6>({lat.toString()}, {lng.toString()})</h6>
      {rows}
    </div>
  );
};

UncontainedHobbiesView.propTypes = {
  location: PropTypes.string.isRequired,
  hobbies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  updateGeocode: PropTypes.bool.isRequired,
  updateHobbies: PropTypes.bool.isRequired,
  handleGeocode: PropTypes.func.isRequired,
  handleHobbies: PropTypes.func.isRequired,
  handlePlaces: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
  hobbies: state.hobbies,
  lat: state.lat,
  lng: state.lng,
  updateGeocode: state.updateGeocode,
  updateHobbies: state.updateHobbies,
});

const mapDispatchToProps = dispatch => ({
  handleGeocode: (lat, lng) => dispatch(changeGeocode(lat, lng)),
  handleHobbies: hobbies => dispatch(changeHobbies(hobbies)),
  handlePlaces: (hobby, places) => dispatch(changePlaces(hobby, places)),
});

const HobbiesView = connect(mapStateToProps, mapDispatchToProps)(UncontainedHobbiesView);

export default HobbiesView;
