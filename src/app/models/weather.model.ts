export interface WeatherDescription {
  description: string;
  icon: string;
}

export interface WeatherMeasurements {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface Wind {
  speed: number;
}

export interface CurrentWeather {
  name: string;
  weather: WeatherDescription[];
  main: WeatherMeasurements;
  wind: Wind;
  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: WeatherMeasurements;
  weather: WeatherDescription[];
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}