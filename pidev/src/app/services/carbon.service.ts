// src/app/services/carbon.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonService {
  private apiUrl = 'http://172.16.2.13:5000/predict_co2';

  constructor(private http: HttpClient) {}

  estimateCO2(transportType: string, distance: number) {
    return this.http.post<any>(this.apiUrl, {
      transport_type: transportType,
      distance: distance
    });
  }
}
