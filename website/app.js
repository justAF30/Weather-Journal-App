/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API key and link
let apiKey = "&appid=e77b20507bf871524d9badcada90330a";
let baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Event Listener
document.getElementById("generate").addEventListener("click", performAction);

// performAction func
function performAction(e) {
  {
    const newZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeather(baseUrl, newZip, apiKey).then(function (data) {
      console.log(data);
      postData("/add", {
        date: newDate,
        temp: data.main.temp,
        content: feelings,
      });
      updateUI();
    });
  }
}

const getWeather = async (baseUrl, zip, key) => {
  const res = await fetch(baseUrl + zip + key);

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log("error", err);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${allData[0].temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `I am feeling: ${allData[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
