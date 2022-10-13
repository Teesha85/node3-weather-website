const request = require("request");

const forecast = (GeoLongitude, GeoLatitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d0b87b0c36ff772dff764672158f1c4e&query=${GeoLongitude},${GeoLatitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    //destructuring response.body
    //This was how I did it originally
    // const {
    //   temperature,
    //   feelslike,
    //   weather_descriptions: [description],
    // } = response.body.current;

    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.error) {
      callback(
        "This is not a valid location. Please re-enter your search",
        undefined
      );
    } else {
      callback(undefined, {
        currentTemp: body.current.temperature,
        feelslikeTemp: body.current.feelslike,
        weatherDescription: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
