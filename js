document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f66776d13a02a80275044c07b5766e7c';

    function fetchWeather(api) {
        fetch(api)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { name } = data;
                const { temp } = data.main;
                const { description, icon } = data.weather[0];

                document.getElementById('location').textContent = name;
                document.getElementById('temperature').textContent = `${temp}°C`;
                document.getElementById('description').textContent = description;
                document.getElementById('icon').setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                document.getElementById('location').textContent = 'Unable to fetch weather data';
                document.getElementById('temperature').textContent = '';
                document.getElementById('description').textContent = '';
                document.getElementById('icon').setAttribute('src', '');
            });
    }

    function getWeatherByLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const long = position.coords.longitude;
                const lat = position.coords.latitude;
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
                fetchWeather(api);
            }, error => {
                console.error('Geolocation error:', error);
                document.getElementById('location').textContent = 'Unable to retrieve location';
                document.getElementById('temperature').textContent = '';
                document.getElementById('description').textContent = '';
                document.getElementById('icon').setAttribute('src', '');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    function getWeatherByCity(city) {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        fetchWeather(api);
    }

    document.getElementById('search-button').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            getWeatherByCity(city);
        } else {
            alert('Please enter a city name');
        }
    });

    // Initial load with geolocation
    getWeatherByLocation();
});
