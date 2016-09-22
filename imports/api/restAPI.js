import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'restAPI.getGooglePlaces': (name, lat, lng) => (
    HTTP.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json?', {
        params: {
          query: name,
          key: Meteor.settings.public.google.apiKey,
          location: `${lat},${lng}`,
        },
      }
    )
  ),
  'restAPI.getYelpPlaces': (name, lat, lng) => HTTP.get(
    'https://api.yelp.com/v3/businesses/search', {
      params: {
        term: name,
        latitude: lat,
        longitude: lng,
      },
      headers: {
        Authorization: `Bearer ${Meteor.settings.public.yelp.apiKey}`,
      },
    }
  ),
});
