const keys = require('../keys');
const request = require('request');

let geocodeAddress = (address, callback) => {
    
    let encodedAddress = encodeURIComponent(address);
    
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.google_maps}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.', error);
            
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to finde that address.');
            
        } else if (body.status === 'OK') {
            
            callback(undefined, {
                address: body.results[ 0 ].formatted_address,
                latitude: body.results[ 0 ].geometry.location.lat,
                longitude: body.results[ 0 ].geometry.location.lng
            });
            
        }
    });
};

module.exports = {
    geocodeAddress
};
