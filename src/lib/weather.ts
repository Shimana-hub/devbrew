export async function fetchWeather(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await res.json();
  return {
    temp: data.main.temp,
    desc: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
  };
}
