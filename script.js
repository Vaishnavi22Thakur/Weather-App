const apiKey="6bfb9f25b2bd014e1b63f94d884d1620";
async function getWeather(){
    const city=document.getElementById("city").value.trim();
    const weather=document.getElementById("weather");
    const box=document.getElementById("weatherbox");
    if(!city){
        weather.innerHTML="Please enter a city name!";
        box.classList.add("show");
        return;
    }
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        console.log(response.status);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data=await response.json();
        box.classList.remove("show");
        setTimeout(() => {
            const mood=updateWeatherBox(data.weather[0].main)
            weather.innerHTML=
                `<h2>${data.name}</h2>
                <p id="mood">${mood}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>`;
            box.classList.add("show");
        }, 600);
    }
    catch(error){
        weather.innerHTML="Please enter a valid city";
        box.classList.add("show");
    }
}
function updateWeatherBox(weatherType) {
    const box = document.getElementById("weather");
    let mood = "";

    if(weatherType === "Clear") {
        box.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
        mood = "☀️ Sunny";

    }
    else if(weatherType === "Clouds") {
        box.style.background = "linear-gradient(135deg, #d7d2cc, #304352)";
        mood = "☁️ Cloudy";

    }
    else if(weatherType === "Rain" || weatherType === "Drizzle") {
        box.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        mood = "🌧️ Rainy";

    }
    else if(weatherType === "Snow") {
        box.style.background = "linear-gradient(135deg, #e6dada, #274046)";
        mood = "❄️ Snowy";

    }
    else{
        box.style.background = "rgba(255,255,255,0.6)";
        mood = "🌍 Normal Weather";
    }
    return mood;
}