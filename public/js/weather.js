$("document").ready(function () {
  var findWeather = function(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat+"&lon="+lon+"&units=imperial&appid=99e568a8c098df784f03d35a61beb935";
    console.log(url);
    $.getJSON(url, function(data) {
      console.log(data);
      $(".temp-display").text("Temperature: " + data.main.temp);
      $(".weather-display").text("Weather: " + data.weather[0].description);
      $(".wind-display").text("Wind Speed: " + data.wind.speed);
    });
  };
  var latandlon = function (Name) {
    return $.ajax({
      url: "api/mountains/" + Name,
      type: "GET"
    });
  };
  $(document).on("click", ".nhWeatherBtn", function (){
    $(".manage-hikes-display").hide();
    $(".display-google-maps").hide();
    $(".mountain-weather-options").show();
  });
  $(document).on("click", ".weatherBtn", function (){
    var name = $(".mountain-weather-options option:selected")
      .val()
      .trim();
    latandlon(name).then(function(data){
      console.log(data);
      var lat = data.LatLong;
      var lon = data.Longitude;
      findWeather(lat, lon);
    });
  });
  
});