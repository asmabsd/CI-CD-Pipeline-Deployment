import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '48dba20433d75ed2e6be7274ea14bdd5'; // ta clé normale
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getForecastByCity(cityName: string) {
    return this.http.get<any>(`${this.baseUrl}?q=${cityName},TN&units=metric&appid=${this.apiKey}`);
  }
}
