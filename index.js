// Define variables
var cityName = "";
var submitBtn = document.getElementById("submit-button");
var longitude = "";
var latitude = "";
var fiveDayForecastAPI = "";
var OneDayWeatherAPI = "";
var currentDate = dayjs().format("MM/DD/YYYY");
var citySearchHistoryList = document.getElementById("city-search-history-list");

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
