// Define variables
let cityNameInput = document.getElementById("#city-name");
let cityName = "";
let submitBtn = document.getElementById("submit-button");
let longitude = "";
let latitude = "";
let fiveDayForecastAPI = "";
let OneDayWeatherAPI = "";
let currentDate = dayjs().format("MM/DD/YYYY");
let citySearchHistoryList = document.getElementById("city-search-history-list");

// Update the date on each card to the current date
document.getElementById("theDate").textContent = currentDate;
document.getElementById("date-2").textContent = dayjs()
  .add(2, "day")
  .format("MM/DD/YYYY");
document.getElementById("date-3").textContent = dayjs()
  .add(3, "day")
  .format("MM/DD/YYYY");
document.getElementById("date-4").textContent = dayjs()
  .add(4, "day")
  .format("MM/DD/YYYY");
document.getElementById("date-5").textContent = dayjs()
  .add(5, "day")
  .format("MM/DD/YYYY");

// Add an event listener to the submit button to get the city information and weather data
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.getElementById("city-name").value;

  getCityData();
});

// Add an event listener to each city retrieved from local storage
citySearchHistoryList.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    cityName = event.target.value;
    getCityData();
  }
});

// Get the search history from local storage and parse it as an array
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// for every item in the search history, create an li with a button
searchHistory.forEach(function (item) {
  const li = document.createElement("button");
  li.setAttribute("class", "waves-effect waves-light btn");
  li.value = item;
  li.textContent = item;
  citySearchHistoryList.appendChild(li);
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let searched = document.getElementById("city-name").value;
  // Add the searched item to the search history
  searchHistory.push(searched);
  // Save the search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  // Append the searched item to the history list
  let li = document.createElement("button");
  li.setAttribute("class", "waves-effect waves-light btn");
  li.value = searched;
  li.textContent = searched;
  citySearchHistoryList.appendChild(li);
  cityNameInput = "";
});

//need to tie in the clear storage button with an event listener
var clearStorageBtn = document.getElementById("clear-storage");
clearStorageBtn.addEventListener("click", function () {
  localStorage.clear();
});

//fetches a city from the API, to build the URL's for the forecasts
function getCityData() {
  let cityAPI =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=0ad97444a6d994fd11767093cc4caba1";

  fetch(cityAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      longitude = data[0].lon;
      latitude = data[0].lat;
      fiveAPI =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=0ad97444a6d994fd11767093cc4caba1";
      weatherAPI =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=0ad97444a6d994fd11767093cc4caba1";

      getWeatherData();
      getFiveDayForecast();
    });
}

function getWeatherData() {
  fetch(weatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var temperature = data.main.temp;
      var newTemp = ((temperature - 273.15) * 9) / 5 + 32;
      var realTeam = Math.trunc(newTemp);
      // console.log(temperature)
      var wind = data.wind.speed * 2.237;
      var realWind = Math.trunc(wind);
      var humidity = data.main.humidity;
      var cityCalled = data.name;
      document.getElementById("city-temp").textContent =
        realTeam + "° Fahrenheit";
      document.getElementById("city-wind").textContent =
        realWind + " MPH wind(s)";

      document.getElementById("cityname").textContent = cityCalled;

      document.getElementById("city-humid").textContent =
        humidity + "% humidity";
    });
}

function getFiveDayForecast() {
  fetch(fiveAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecast = [];
      forecast = data;

      //this loop gets the element by the id and changes the text to correct weather parameters
      for (let i = 1; i < 6; i++) {
        var temperature = forecast.list[i].main.temp;
        var newTemp = ((temperature - 273.15) * 9) / 5 + 32;
        var realTeam = Math.trunc(newTemp);
        // console.log(temprature)
        var wind = forecast.list[i].wind.speed * 2.237;
        var realWind = Math.trunc(wind);
        var humidity = forecast.list[i].main.humidity;
        document.getElementById("temp-" + [i]).textContent =
          realTeam + "° Fahrenheit";
        document.getElementById("wind-" + [i]).textContent =
          realWind + " MPH wind(s)";
        document.getElementById("humid-" + [i]).textContent =
          humidity + "% humidity";
      }
    });
}
