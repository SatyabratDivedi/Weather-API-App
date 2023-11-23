async function fetchWeatherData() {
  let cityInput = document.getElementById("searchBox");
  let city = cityInput.value.trim();
  cityInput.value = "";
  let ApiKey = "8cb141c2216d825a2e3eb21d88e85b7f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    tempbox.innerHTML = Math.round(data.main.temp) + "&#8451";
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    windspeed.innerHTML = Math.round(data.wind.speed) + " km/h";
    humidity.innerHTML = Math.round(data.main.humidity) + " %";

    let weatherMain = data.weather[0].main.toLowerCase();
    let iconUrl;
    let report;

    switch (weatherMain) {
      case "clear":
        iconUrl = `img/clear.png`;
        console.log("clear weather");
        report = "Clear Weather";
        break;
      case "clouds":
        iconUrl = `img/clouds.png`;
        console.log("clouds weather");
        report = "Clouds Weather";
        break;
      case "drizzle":
        iconUrl = `img/drizzle.png`;
        console.log("drizzle weather");
        report = "Drizzle Weather";
        break;
      case "snow":
        iconUrl = `img/snow.png`;
        console.log("snow weather");
        report = "Snow Weather";
        break;
      case "rain":
        iconUrl = `img/rain.png`;
        console.log("rain weather");
        report = "Rain Weather";
        break;
      case "mist":
        iconUrl = `img/mist.png`;
        console.log("mist weather");
        report = "Mist Weather";
        break;
      case "smoke":
        iconUrl = `img/Smoke.svg`;
        console.log("Smoke weather");
        report = "Smoke Weather";
        break;
      default:
        iconUrl = `img/snow.png`;
        report = "Snow Weather";
    }
    icon.setAttribute("src", iconUrl);
    weatherReport.innerHTML = `${report}...`;
  } catch (error) {
    alert(`[${city}] is not a correct city name`);
    throw new Error("City not found");
  }
}

const darkmodeHere = document.getElementById("darkmodeHere");
const savedMode = localStorage.getItem("mode");

if (savedMode) {
  darkmodeHere.setAttribute("data-theme", savedMode);
}
darkmode.onclick = () => {
  if (!darkmodeHere.hasAttribute("data-theme")) {
    darkmodeHere.setAttribute("data-theme", "dark");
    darkmode.innerHTML = "&#9788;";
    localStorage.setItem("mode", "dark");
    searchBox.setAttribute("style", "color: white");
    weatherReport.setAttribute("style", "color: white");
  } else {
    darkmodeHere.removeAttribute("data-theme");
    darkmode.innerHTML = "&#9790;";
    localStorage.removeItem("mode");
    searchBox.setAttribute("style", "color: black");
    weatherReport.setAttribute("style", "color: black");
  }
};

if (!darkmodeHere.hasAttribute("data-theme")) {
  darkmode.innerHTML = "&#9790;";
  searchBox.setAttribute("style", "color: black");
  weatherReport.setAttribute("style", "color: black");
} else {
  darkmode.innerHTML = "&#9788;";
  searchBox.setAttribute("style", "color: white");
  weatherReport.setAttribute("style", "color: white");
}
