// State objects props
// location :: string
// example: a place known by Google Maps
// used to get nearby activities, cost-of-living-data etc.
const initialState = {
  companies: [],
  company: '',
  location: '',
  heading: '',
  lat: NaN,
  lng: NaN,
  interests: [],
  places: [],
  gamingEvents: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    // InputForm.jsx
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.text,
      });
    case 'CHANGE_GEOCODE':
      return Object.assign({}, state, {
        location: '',
        heading: `${state.location} Stats`,
        lat: action.lat,
        lng: action.lng,
      });
    // Companies/CompaniesForm.jsx
    case 'ADD_COMPANY':
      if (action.companyObj) {
        console.log(action.companyObj);
        return Object.assign({}, state, {
          company: '',
          companies: [action.companyObj, ...state.companies],
        });
      }
      return state;
    case 'CHANGE_COMPANY':
      return Object.assign({}, state, {
        company: action.company,
      });
    // Interests/InterestsForm.jsx
    case 'CHANGE_INTERESTS':
      console.log('Changed interests!');
      return Object.assign({}, state, {
        interests: action.interests,
      });
    case 'ADD_GAMING_EVENT':
      return Object.assign({}, state, {
        gamingEvents: [
          ...state.gamingEvents,
          [action.event, action.distance],
        ],
      });
    /*
    case 'CHANGE_PLACES':
      console.log(action.places);
      return Object.assign({}, state, {
        places: state.places.concat(action.places.map(elem => [elem.name, action.hobby])),
      });
    case 'CHANGE_VALID_STATE':
      return Object.assign({}, state, {
        locValidState: action.isPlace ? 'success' : 'error',
        loadingAnimation: false,
      });
    case 'IS_FIRST_TIME':
      return Object.assign({}, state, {
        firstTime: false,
        loadingAnimation: true,
      });
    */
    default:
      return state;
  }
};

export default reducers;
