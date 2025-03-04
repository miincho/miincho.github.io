// const url = 'https://meteostat.p.rapidapi.com/point/monthly?lat=52.5244&lon=13.4105&alt=43&start=2020-01-01&end=2020-12-31';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'e1a3ead126msh1def8f62fa48c99p173776jsnb3f282ad90a5',
// 		'x-rapidapi-host': 'meteostat.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// async function fetchWeather(lat, lon) {
//     const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
//     const url = `https://meteostat.p.rapidapi.com/point/daily?lat=${lat}&lon=${lon}&alt=43&start=${today}&end=${today}`;

//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': 'e1a3ead126msh1def8f62fa48c99p173776jsnb3f282ad90a5',
//             'x-rapidapi-host': 'meteostat.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();

//         if (result.data.length > 0) {
//             const todayData = result.data[0];

//             weatherData = {
//                 lat: lat,
//                 lon: lon,
//                 precipitation: todayData.prcp || 0, // Precipitation in mm
//                 windSpeed: todayData.wspd || 0      // Wind speed in km/h
//             };

//             console.log(weatherData);
//         } else {
//             console.warn("No weather data available for today.");
//         }
//     } catch (error) {
//         console.error("Weather API Error:", error);
//     }
// }

// function getUserLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;
//                 fetchWeather(lat, lon);
//             },
//             (error) => {
//                 console.error("Geolocation Error:", error);
//             }
//         );
//     } else {
//         console.error("Geolocation not supported by this browser.");
//     }
// }