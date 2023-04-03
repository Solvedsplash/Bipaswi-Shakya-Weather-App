const weather = {
    apiKey: "14c3d94fe0eb09cfe433a55e0efd13fd",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
          this.displayWeather(data);
          this.setBackground(data.weather[0].main);
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, pressure } = data.main;
      const { speed } = data.wind;
      const { dt } = data;
      const { rain } = data.hasOwnProperty("rain") ? data.rain : { rain: 0 };
      const date = new Date(dt * 1000).toLocaleDateString();
    
      document.querySelector(".city").innerText = "Weather in " + name + " on " + date;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".rain").innerText = "Rainfall: " + rain + " mm";
      document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
      document.querySelector(".weather").classList.remove("loading");
    },
    
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
    setBackground: function (condition) {
      const body = document.querySelector("body");
      body.classList.remove("clear-sky", "cloudy", "rainy",);
      if (condition === "Clear") {
        body.classList.add("clear-sky");
      } else if (condition === "Clouds") {
        body.classList.add("cloudy");
      }else if (condition === "Mist") {
        body.classList.add("cloudy");
      } else if (condition === "Rain") {
        body.classList.add("rainy");
      }
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  weather.fetchWeather("Dothan");
  