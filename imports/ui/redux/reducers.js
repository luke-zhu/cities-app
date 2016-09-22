// State objects props
// location :: string 
// example: a place known by Google Maps
// used to get nearby activities, cost-of-living-data etc.
const initialState = {
  companies: [],
  location: '',
  lat: NaN,
  lng: NaN,
  hobbies: [],
  places: [],
  updateGeocode: false,
  updateHobbies: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.text,
        places: [],
      });
    case 'CHANGE_GEOCODE':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
        updateGeocode: false,
        updateHobbies: true,
      });
    case 'CHANGE_HOBBIES':
      if (action.hobbies.length !== state.hobbies.length) {
        return Object.assign({}, state, {
          hobbies: action.hobbies,
          updateHobbies: false,
          updateGeocode: true,
        });
      }
      for (let i = 0; i < action.hobbies.length; i += 1) {
        if (action.hobbies[i] !== state.hobbies[i]) {
          return Object.assign({}, state, {
            hobbies: action.hobbies,
            updateHobbies: false,
            updateGeocode: true,
          });
        }
      }
      return Object.assign({}, state, {
        hobbies: action.hobbies,
        updateHobbies: false,
        updateGeocode: false,
      });
    case 'CHANGE_PLACES':
      console.log(action.places);
      return Object.assign({}, state, {
        places: state.places.concat(action.places.map(elem => [elem.name, action.hobby])),
        updateHobbies: true,
      });
    case 'START_UPDATE':
      return Object.assign({}, state, {
        [action.updateName]: true,
      });
    /*
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
