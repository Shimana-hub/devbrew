"use client";

import { useEffect, useState } from "react";
import { WidgetContainer } from "./WidgetContainer";
import { fetchWeather } from "@/lib/weather";

export function WeatherWidget({ city = "Lagos" }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        const weather = await fetchWeather(city);
        setData(weather);
      } catch (err) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [city]);

  return (
    <WidgetContainer title={`Weather: ${city}`}>
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {data && (
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.desc}
          />
          <div>
            <p className="text-xl font-semibold">{Math.round(data.temp)}°C</p>
            <p className="text-muted-foreground capitalize">{data.desc}</p>
          </div>
        </div>
      )}
    </WidgetContainer>
  );
}