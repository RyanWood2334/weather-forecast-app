// Define variables
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
historyList.addEventListener("click", function (event) {
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
  li.value = item;
  li.textContent = item;
  historyList.appendChild(li);
});

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
