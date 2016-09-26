import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import moment from 'moment';

// Error action creator
const handleError = errorName => ({
  type: 'HANDLE_ERROR',
  errorName,
});

// Companies/CompaniesForm.jsx
export const changeCompany = company => ({
  type: 'CHANGE_COMPANY',
  company,
});

const addCompany = companyObj => ({
  type: 'ADD_COMPANY',
  companyObj,
});

export const getCompanyData = (location, company) => (
  dispatch => (
    Meteor.call(
      'restAPI.getGlassdoorRatings', location, company,
      (error, response) => {
        if (error) console.log(error);
        else if (!response.data.response.employers.length) {
          dispatch(handleError('glassdoorError'));
        } else {
          dispatch(addCompany(response.data.response.employers[0]));
        }
      }
    )
  )
);

// Interests/InterestsForm.jsx

const addPlaces = (interest, places) => ({
  type: 'ADD_PLACES',
  interest,
  places,
});

const getPlaces = (interest, lat, lng) => dispatch => (
  Meteor.call('restAPI.getGooglePlaces', interest, lat, lng,
    (error, response) => {
      if (error) console.log(error);
      else if (response.data.status === 'OK') {
        dispatch(addPlaces(interest, response.data.results));
      }
    })
);

const addGamingEvents = (events, distances) => ({
  type: 'ADD_GAMING_EVENTS',
  events,
  distances,
});

const getDistance = (lat, lng, events) => (
  // Gets distance from Google Distance Matrix (Use sparingly)
  dispatch => (
    Meteor.call('restAPI.getGoogleDistance', lat, lng, events,
      (error, response) => {
        if (error) console.log(error);
        else if (response[1].data.status === 'OK') {
          dispatch(addGamingEvents(
            response[0], // the events
            response[1].data.rows[0].elements // the distance objects
          ));
        }
      }
    )
  )
);

const getGamingEvents = (lat, lng) => (
  dispatch => (
    HTTP.get(
      'https://www.googleapis.com/calendar/v3/calendars/eventsforgamers@gmail.com/events?', {
        params: {
          key: Meteor.settings.public.google.apiKey,
          timeMin: moment()
                  .weekday(0)
                  .hour(0)
                  .minute(0)
                  .toISOString(),
        },
      }, (error, response) => {
        if (error) console.log(error);
        else {
          for (let i = 0; i <= response.data.items.length / 25; i += 1) {
            dispatch(getDistance(
              lat,
              lng,
              response.data.items.slice(25 * i, 25 * (i + 1))
            ));
          }
        }
      }
    )
  )
);

export const changeInterests = (interests, lat, lng, received) => (
  (dispatch) => {
    for (let i = 0; i < interests.length; i += 1) {
      switch (interests[i]) {
        case 'Gaming':
          if (!received.gaming) dispatch(getGamingEvents(lat, lng));
          break;
        case 'Movies':
          if (!received.movies) dispatch(getPlaces('movies', lat, lng));
          break;
        case 'Exercise':
          if (!received.exercise) dispatch(getPlaces('gym', lat, lng));
          break;
        default:
          break;
      }
    }
    return dispatch({
      type: 'CHANGE_INTERESTS',
      interests,
    });
  }
);

// InputForm.jsx
export const changeLocation = text => ({
  type: 'CHANGE_LOCATION',
  text,
});

const changeGeocode = (lat, lng) => ({
  type: 'CHANGE_GEOCODE',
  lat,
  lng,
});

export const getGeocode = state => (
  dispatch => (
    HTTP.get(
      'https://maps.googleapis.com/maps/api/geocode/json?', {
        params: {
          address: state.location,
          key: Meteor.settings.public.google.apiKey,
        },
      }, (error, response) => {
        if (error) console.log(error);
        else if (response.data.status === 'ZERO_RESULTS') {
          dispatch(handleError('geocodeError'));
        } else {
          const lat = response.data.results[0].geometry.location.lat;
          const lng = response.data.results[0].geometry.location.lng;
          dispatch(changeGeocode(lat, lng));
          dispatch(changeInterests(
            state.interests,
            lat, lng, {
              gaming: false,
              movies: false,
              exercise: false,
            }));
        }
      }
    )
  )
);

// OutputForm.jsx
export const switchTabs = tab => ({
  type: 'SWITCH_TABS',
  tab,
});
