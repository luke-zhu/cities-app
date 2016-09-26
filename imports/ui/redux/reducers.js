const initialState = {
  // General Visual
  selectedTab: '', // equals 'Company', 'Interests', used for tabs, title

  // Companies
  // Useful props
  companies: [],
  // Visual props
  company: '', // CompaniesForm, real-time changes

  // Location
  // Useful props
  lat: NaN, // InputForm, CompaniesForm,
  lng: NaN, //  Use these for location to reduce HTTP calls
  // Visual props
  location: '', // InputForm, real-time changes
  heading: '', // OutputView, geocode string name

  interests: [],
  gamingEvents: [], // depend on location
  moviePlaces: [],
  exercisePlaces: [],
  received: {
    movies: false,
    gaming: false,
    exercise: false,
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
        },
        heading: `${state.location} Stats`,
        geocodeError: false,
      });
      // Companies/CompaniesForm.jsx
    case 'ADD_COMPANY':
      if (action.companyObj) {
        return Object.assign({}, state, {
          company: '',
          companies: [action.companyObj, ...state.companies],
          glassdoorError: false,
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
    case 'CHANGE_INTERESTS':
      return Object.assign({}, state, {
        interests: action.interests,
        // Tabs
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
          },
        });
      } else if (action.interest === 'gym') {
        return Object.assign({}, state, {
          exercisePlaces: action.places,
          received: {
            movies: state.received.movies,
            gaming: state.received.gaming,
            exercise: true,
          },
        });
      }
      return state;
    default:
      return state;
  }
};

export default reducers;
