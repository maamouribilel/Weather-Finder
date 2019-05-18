'use strict';
// autocomplete goole api
function initialize() {
  var input = document.getElementById('city');
  new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

let cityBtn = document.getElementById('findCityBtn');
let tempRes = document.getElementById('tempRes');
let errorHandler = document.getElementById('errorHandler');

const API_KEY = 'OpenWeatherMap API Key HERE!';
cityBtn.addEventListener('click', event => {
  event.preventDefault();
  tempRes.innerHTML = '';
  errorHandler.innerHTML = '';

  let city = document.getElementById('city').value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
  ).then(res => {
    res
      .json()
      .then(data => {
        let temp = Math.round(data.main.temp - 273.15);
        let humidity = data.main.humidity;
        let skyDesc = data.weather[0].description;
        let wind = data.wind.speed;
        if (temp < 20) {
          tempRes.innerHTML += `<div class='row'> <p>Temperature : <span class='result'> ${temp} <i class='fas fa-temperature-low'></i></span></p> </div>`;
        } else {
          tempRes.innerHTML += `<div class='row'> <p>Temperature : <span class='result'> ${temp} <i class='fas fa-temperature-high'></i></span></p> </div>`;
        }
        tempRes.innerHTML += `<div class='row'> <p>Sky : <span class='result'> ${skyDesc} <i class='fas fa-cloud'></i></span></p> </div>`;
        tempRes.innerHTML += `<div class='row'> <p>Humidity : <span class='result'> ${humidity} </span>%</p> </div>`;
        tempRes.innerHTML += `<div class='row'> <p>Wind speed : <span class='result'> ${wind} </span> Knots</p> </div>`;
        if (temp < 10 && humidity > 80) {
          tempRes.innerHTML += `</br></br><div class='row'><span class='result'>Bad weather??! Netflix & chill<i class="far fa-smile-wink"></i></span></div>`;
        }
      })
      .catch(err => {
        errorHandler.innerHTML = `<div class='alert alert-danger '><strong>Info!</strong>  Please verify the entered data!</div>`;
      });
  });
});
