import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import moment from 'moment';


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

export const getGeocode = location => (
  dispatch => (
    HTTP.get(
      'https://maps.googleapis.com/maps/api/geocode/json?', {
        params: {
          address: location,
          key: Meteor.settings.public.google.apiKey,
        },
      }, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          const lat = response.data.results[0].geometry.location.lat;
          const lng = response.data.results[0].geometry.location.lng;
          dispatch(changeGeocode(lat, lng));
        }
      }
    )
  )
);

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
        if (error) {
          console.log(error);
        } else if (!response.data.response.employers.length) {
          console.log('No companies data');
        } else {
          dispatch(addCompany(response.data.response.employers[0]));
        }
      }
    )
  )
);

// Interests/InterestsForm.jsx
const addGamingEvent = (event, distance) => ({
  type: 'ADD_GAMING_EVENT',
  event,
  distance,
});

const getDistance = (lat, lng, event) => (
  dispatch => (
    Meteor.call('restAPI.getGoogleDistance', lat, lng, event,
      (error, response) => {
        if (error) {
          console.log(error);
        } else if (response[1].data.rows[0].elements[0].status === 'NOT_FOUND') {
          console.log('Not Found');
        } else if (response[1].data.rows[0].elements[0].status === 'ZERO_RESULTS') {
          console.log('Zero results');
        } else {
          dispatch(addGamingEvent(
            response[0], // the event
            response[1].data.rows[0].elements[0].duration.value
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
        if (error) {
          console.log(error);
        } else {
          console.log(response);
          for (let i = 0; i < 5; i += 1) {
            dispatch(getDistance(lat, lng, response.data.items[i]));
          }
        }
      }
    )
  )
);

export const changeInterests = (interests, lat, lng) => (
  (dispatch) => {
    for (let i = 0; i < interests.length; i += 1) {
      switch (interests[i]) {
        case 'Gaming':
          // Change so it does not call Google Distance Matrix every time!
          dispatch(getGamingEvents(lat, lng));
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
