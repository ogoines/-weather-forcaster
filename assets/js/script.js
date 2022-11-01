const apiKey = "32d30234af0ce628a4f925069a3437c0"
var cities = [];

const cityFormEl=document.querySelector("#city-search-form");
const cityInputEl=document.querySelector("#city");
const weatherContainerEl=document.querySelector("#current-weather-container");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");
const forecastContainerEl = document.querySelector("#fiveday-container");
const formerSearchButtonEl = document.querySelector("#former-search-buttons");




const formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Pllease enter a City");
    }
    saveSearch();
    formerSearch(city);
}

//weather api fetch request
const getCityWeather = function(city){
   
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

const displayWeather = function(weather, searchCity){
   //clear old content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;
   //console.log(weather);

   //create date element
   var currentDate = document.createElement("span")
   var weatherIcon = document.createElement("img")
   var temperatureEl = document.createElement("span");
   var humidityEl = document.createElement("span");
   var windSpeedEl = document.createElement("span");

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;

   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   weatherContainerEl.appendChild(temperatureEl);
   weatherContainerEl.appendChild(humidityEl);
   weatherContainerEl.appendChild(windSpeedEl);
   getUvIndex(lat,lon)

}  






const getUvIndex = function(lat,lon){
    var apiKey = "32d30234af0ce628a4f925069a3437c0"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}


const displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndexEl);
}
 


const get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
    

    const display5Day = function(weather){
        forecastContainerEl.textContent = ""
        forecastTitle.textContent = "5-Day Forecast:";
    
        var forecast = weather.list;
            for(var i=5; i < forecast.length; i=i+8){
           var dailyForecast = forecast[i];
            
           
           var forecastEl = document.createElement("div");
           var forecastDate = document.createElement("h5")
           var weatherIcon = document.createElement("img")
           var forecastTempEl = document.createElement("span");
           var forecastHumEl = document.createElement("span");
           
        
           forecastEl.classList = "card bg-primary text-light m-2";
           forecastDate.classList = "card-header text-center"
           weatherIcon.classList = "card-body text-center";
           forecastTempEl.classList = "card-body text-center";
           forecastHumEl.classList = "card-body text-center";
          
           forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
           weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
           forecastTempEl.textContent = dailyForecast.main.temp + " °F";
           forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
          
           forecastEl.appendChild(forecastDate);
           forecastEl.appendChild(weatherIcon);
           forecastEl.appendChild(forecastTempEl);
           forecastEl.appendChild(forecastHumEl);
           forecastContainerEl.appendChild(forecastEl);
        }
    
    }



    
const formerSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
formerSearchButtonEl.addEventListener("click", formerSearchHandler);
    
const formerSearch = function(formerCity){
 
    // console.log(formerCity)

    formerSearchEl = document.createElement("button");
    formerSearchEl.textContent = formerCity;
    formerSearchEl.classList = "d-flex w-100 btn-light border p-2";
    formerSearchEl.setAttribute("data-city", formerCity)
    formerSearchEl.setAttribute("type", "submit");

    formerSearchButtonEl.prepend(formerSearchEl);
}


const formerSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
formerSearchButtonEl.addEventListener("click", formerSearchHandler);

    