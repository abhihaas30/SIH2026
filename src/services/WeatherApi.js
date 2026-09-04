const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

function getWeatherCondition(code) {
    if (code === 0) return 'Clear Sky';

    if ([1, 2].includes(code)) return 'Partly Cloudy';

    if (code === 3) return 'Overcast';

    if ([45, 48].includes(code)) return 'Foggy';

    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';

    if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';

    if ([71, 73, 75, 77].includes(code)) return 'Snow';

    if ([80, 81, 82].includes(code)) return 'Rain Showers';

    if ([85, 86].includes(code)) return 'Snow Showers';

    if ([95, 96, 99].includes(code)) return 'Thunderstorm';

    return 'Unknown';
}

function formatHour(time) {
    const date = new Date(time);

    return date.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        hour12: true,
    });
}

function formatDay(dateString, index) {
    const date = new Date(`${dateString}T00:00:00`);

    if (index === 0) {
        return 'Today';
    }

    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
    });
}

function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
    });
}

export async function fetchWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,

        current: [
            'temperature_2m',
            'apparent_temperature',
            'relative_humidity_2m',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m',
            'visibility',
            'surface_pressure',
            'weather_code',
        ].join(','),

        hourly: [
            'temperature_2m',
            'precipitation_probability',
            'wind_speed_10m',
            'relative_humidity_2m',
            'weather_code',
        ].join(','),

        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_max',
            'wind_speed_10m_max',
            'sunrise',
            'sunset',
        ].join(','),

        timezone: 'auto',
        forecast_days: '7',
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    /*
     * Find the current hour in the hourly forecast.
     * This prevents the chart from starting at midnight.
     */
    const currentHour = data.current.time.slice(0, 13) + ':00';

    let startIndex = data.hourly.time.indexOf(currentHour);

    if (startIndex === -1) {
        startIndex = 0;
    }

    const hourlyForecast = data.hourly.time
        .slice(startIndex, startIndex + 12)
        .map((time, index) => {
            const actualIndex = startIndex + index;

            return {
                time: formatHour(time),
                temp: Math.round(data.hourly.temperature_2m[actualIndex]),
                rain: data.hourly.precipitation_probability[actualIndex] ?? 0,
                wind: Math.round(data.hourly.wind_speed_10m[actualIndex]),
                humidity: data.hourly.relative_humidity_2m[actualIndex] ?? 0,
                condition: getWeatherCondition(
                    data.hourly.weather_code[actualIndex]
                ),
            };
        });

    const weeklyForecast = data.daily.time.map((date, index) => ({
        day: formatDay(date, index),
        date: formatDate(date),
        high: Math.round(data.daily.temperature_2m_max[index]),
        low: Math.round(data.daily.temperature_2m_min[index]),
        rain: data.daily.precipitation_probability_max[index] ?? 0,
        condition: getWeatherCondition(data.daily.weather_code[index]),
        wind: Math.round(data.daily.wind_speed_10m_max[index]),
    }));

    const currentWeather = {
        temperature: Math.round(data.current.temperature_2m),

        feelsLike: Math.round(data.current.apparent_temperature),

        condition: getWeatherCondition(
            data.current.weather_code
        ),

        humidity: data.current.relative_humidity_2m,

        wind: {
            speed: Math.round(data.current.wind_speed_10m),
            gust: Math.round(data.current.wind_gusts_10m),
            direction: Math.round(data.current.wind_direction_10m),
        },

        visibility: data.current.visibility
            ? Math.round((data.current.visibility / 1000) * 10) / 10
            : null,

        pressure: Math.round(data.current.surface_pressure),

        sunrise: data.daily.sunrise[0]
            ? new Date(data.daily.sunrise[0]).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
            : '--',

        sunset: data.daily.sunset[0]
            ? new Date(data.daily.sunset[0]).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
            : '--',
    };

    return {
        currentWeather,
        hourlyForecast,
        weeklyForecast,
    };
}