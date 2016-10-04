import { Meteor } from 'meteor/meteor';

const initialState = {
  // General Visual
  selectedTab: '', // equals 'Company', 'Interests', used for tabs, title
  interestsTab: '',
  // Companies
  // Useful props
  companies: [],
  // Visual props
  company: '', // CompaniesForm, real-time changes
  selectedCompany: '', // the selected company tab

  // Location
  // Useful props
  lat: NaN, // InputForm, CompaniesForm,
  lng: NaN, //  Use these for location to reduce HTTP calls
  tempHigh: NaN,
  tempLow: NaN,
  // Visual props
  location: '', // InputForm, real-time changes
  heading: '', // OutputView, geocode string name

  interests: [],
  gamingEvents: [], // depend on location
  moviePlaces: [],
  exercisePlaces: [],
  foodPlaces: [],
  musicPlaces: [],
  shoppingPlaces: [],
  sportsTeams: [],
  travelPlaces: [],

  received: {
    movies: false,
    gaming: false,
    exercise: false,
    travel: false,
    music: false,
  },

  // ERRORS, if true, then red outline around input box
  glassdoorError: false,
  geocodeError: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_ERROR':
      console.log(action.errorName);
      return Object.assign({}, state, {
        [action.errorName]: true,
      });
      // OutputView.jsx
    case 'SWITCH_TABS':
      return Object.assign({}, state, {
        selectedTab: action.tab,
      });
      // InputForm.jsx
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.text,
        // Reload gaming event distances
        selectedTab: 'Location',
      });
    case 'CHANGE_GEOCODE':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
        // OutputView title
        location: '',
        // Reset events,
        gamingEvents: [],
        received: {
          movies: false,
          gaming: false,
          exercise: false,
          travel: false,
          music: false,
          shopping: false,
        },
        heading: `${state.location} Stats`,
        geocodeError: false,
      });
    case 'CHANGE_TEMPERATURE':
      return Object.assign({}, state, {
        tempHigh: action.high,
        tempLow: action.low,
      });
      // Companies/CompaniesForm.jsx
    case 'SWITCH_COMPANIES_TAB':
      return Object.assign({}, state, {
        selectedCompany: action.company,
      });
    case 'ADD_COMPANY':
      if (action.companyObj) {
        return Object.assign({}, state, {
          company: '',
          companies: [action.companyObj, ...state.companies],
          glassdoorError: false,
          selectedCompany: action.companyObj.name,
        });
      }
      return state;
    case 'CHANGE_COMPANY':
      return Object.assign({}, state, {
        company: action.company,
        // Tabs
        selectedTab: 'Company',
      });
      // Interests/InterestsForm.jsx
    case 'SWITCH_INTEREST_TABS':
      return Object.assign({}, state, {
        interestsTab: action.interest,
      });
    case 'CHANGE_INTERESTS':
      return Object.assign({}, state, {
        interests: action.interests,
        // Tabs
        interestsTab: action.interests[0],
        selectedTab: 'Interests',
      });
    case 'ADD_GAMING_EVENTS':
      return Object.assign({}, state, {
        gamingEvents: [
          ...state.gamingEvents,
          ...action.events.map((e, ind) => (
            [e, action.distances[ind]]
          )),
        ],
        received: {
          movies: state.received.movies,
          gaming: true,
          exercise: state.received.exercise,
          travel: state.received.travel,
          music: state.received.music,
          shopping: state.received.shopping,
        },
      });
    case 'ADD_PLACES':
      if (action.interest === 'movies') {
        return Object.assign({}, state, {
          moviePlaces: action.places,
          received: {
            movies: true,
            gaming: state.received.gaming,
            exercise: state.received.exercise,
            travel: state.received.travel,
            music: state.received.music,
            shopping: state.received.shopping,
          },
        });
      } else if (action.interest === 'gym') {
        return Object.assign({}, state, {
          exercisePlaces: action.places,
          received: {
            movies: state.received.movies,
            gaming: state.received.gaming,
            exercise: true,
            travel: state.received.travel,
            music: state.received.music,
            shopping: state.received.shopping,
          },
        });
      } else if (action.interest === 'airports') {
        return Object.assign({}, state, {
          travelPlaces: action.places,
          received: {
            movies: state.received.movies,
            gaming: state.received.gaming,
            exercise: state.received.exercise,
            travel: true,
            music: state.received.music,
            shopping: state.received.shopping,
          },
        });
      } else if (action.interest === 'shopping') {
        return Object.assign({}, state, {
          shoppingPlaces: action.places,
          received: {
            movies: state.received.movies,
            gaming: state.received.gaming,
            exercise: state.received.exercise,
            travel: state.received.travel,
            music: state.received.music,
            shopping: true,
          },
        });
      }
      return state;
    case 'ADD_PLACES_FOURSQUARE':
      if (action.interest === 'music and venues') {
        return Object.assign({}, state, {
          musicPlaces: action.venues,
          received: {
            movies: state.received.music,
            gaming: state.received.gaming,
            exercise: state.received.exercise,
            travel: state.received.travel,
            music: true,
            shopping: state.received.shopping,
          },
        });
      }
      return state;
    default:
      console.log(Meteor.user());
      return state;
  }
};

export default reducers;
