const Input = document.querySelector('input');
const Button = document.querySelector('button');
const H2 = document.querySelector('h2');
const H3 = document.querySelector('h3');
const H4 = document.querySelector('h4');
const image = document.getElementById('image')
const WheatherTemp = document.getElementById('temp')
const Wind = document.getElementById('wind')
const Sunrise = document.getElementById('sunrise')
const Description = document.getElementById("description")
const Place = document.getElementById("measure")

Button.addEventListener("click",()=>{
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
    const time  = new Date
    const Day = time.getMonth();
    const monthName = monthNames[Day];
    const date = time.getDate();
    const timing = time.getHours()
    const minutes = time.getMinutes()

    H4.textContent = `${monthName} ${date},Time ${timing} : ${minutes}`
   

    

 
  const Value = Input.value
 
  async function weather() {
    const apiKey = '8c9d71ae3a3e390d58ac526602d44b29';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Value}&appid=${apiKey}`;
  
    try {
      const data = await fetch(apiUrl);
      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
  
      const requiredData = await data.json();
      const Cityname = requiredData.name
      const county = requiredData.sys.country
      H2.textContent = `${Cityname}, ${county}`
      const sunriseTimestamp = requiredData.sys.sunrise * 1000; 
      const sunsetTimestamp = requiredData.sys.sunset * 1000; 
      const sunriseTime = new Date(sunriseTimestamp);
      const sunsetTime = new Date(sunsetTimestamp);
      Sunrise.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()} Sunset: ${sunsetTime.toLocaleTimeString()}`;    
      const Temp = requiredData.main.temp
      const windSpeed = requiredData.wind.speed
      const realtemp = Math.floor(Temp - 273.15);
     WheatherTemp.textContent = `Temprature🌧${realtemp} ℃`
  Wind.textContent = `Wind Speed 🌬 ${windSpeed}`
  const description = requiredData.weather[0].description;
  Description.textContent = `Today's Clouds ${description}`
  const Latitude = requiredData.coord.lat
  const Longtudide = requiredData.coord.lon
  Place.textContent  = `Latitude ${Latitude} Longitude ${Longtudide}`
 
 
    } catch (error) {
      alert('Error:', error);
    }
  }





  Input.value=""
  weather();
})

