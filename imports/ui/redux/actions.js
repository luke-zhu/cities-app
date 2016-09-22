export const changeLocation = text => ({
  type: 'CHANGE_LOCATION',
  text,
});

export const changeGeocode = (lat, lng) => ({
  type: 'CHANGE_GEOCODE',
  lat,
  lng,
});

export const changeHobbies = hobbies => ({
  type: 'CHANGE_HOBBIES',
  hobbies,
});

export const changePlaces = (hobby, places) => ({
  type: 'CHANGE_PLACES',
  hobby,
  places,
});

export const startUpdate = updateName => ({
  type: 'START_UPDATE',
  updateName,
});

/*
export const changeValidState = isPlace => ({
  type: 'CHANGE_VALID_STATE',
  isPlace,
});

export const isFirstTime = () => ({
  type: 'IS_FIRST_TIME',
});
*/
