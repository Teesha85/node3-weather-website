const request = require("request");

const geocode = (address, callback) => {
  //adding encodeURIComponents() - searches location that contains special characters for URL --> makes it into the encoded version.
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGVlc2hhODUiLCJhIjoiY2w4MmYxajZtMDBvOTN1bW83aGpmNWpwMyJ9.gDdRL947CuDWQewAbXFqiw&limit=2`;
  request({ url, json: true }, (error, { body }) => {
    //destructuring response.body
    //This was how I did it
    // const {
    //   center: [latitude, longitude],
    //   place_name,
    // } = body.features[0];

    if (error) {
      callback("Unable to connect to the geo-Web service!", undefined);
    } else if (body.features.length === 0) {
      callback(
        `${address} is not a valid location. Please input a new search query.`,
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
