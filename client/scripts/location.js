let storeItems = document.getElementById("store");
let storeHeader = document.getElementById("store-header");
let loading = document.getElementById("loading");

async function getWeather() {
  loading.style.display = "block";

  const promise  = new Promise((resolve, reject) => {
    setInterval(async() => {
      try {
      const result = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
        )
        resolve(result);
      }catch(err){
        reject(err)
      }finally {
        loading.style.display = "none"
      }
    }, 2000);
  })

  console.log(promise);
    return promise
}

getWeather().then(({ data }) => {
  // const temperature = data.current_weather.temperature;

  // if (temperature > 20) {
  //   storeItems.style.display = "none"
  // } else {
  //   console.log("tilby kaffe");
  // }
  // //...
  // console.log(data);
});
