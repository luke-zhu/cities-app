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
  'restAPI.getGoogleDistance': (lat, lng, event) => ([
    event,
    HTTP.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json?', {
        params: {
          origins: `${lat},${lng}`,
          destinations: event.location,
          key: Meteor.settings.public.google.apiKey,
        },
      }
    ),
  ]),
  'restAPI.getGlassdoorRatings': function (location, company) {
    return (
      HTTP.get(
        'http://api.glassdoor.com/api/api.htm?', {
          params: {
            v: 1,
            format: 'json',
            't.p': Meteor.settings.private.glassdoor.partnerID,
            't.k': Meteor.settings.private.glassdoor.key,
            userip: this.connection.clientAddress,
            useragent: this.connection['user-agent'],
            action: 'employers',
            q: company,
          },
        }
      )
    );
  },
    /*
    */
  /*
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
  */
});
