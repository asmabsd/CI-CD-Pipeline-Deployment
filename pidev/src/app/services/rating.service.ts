//import { Injectable } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailGastronomy } from '../models/detailgastronomy.model';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8089/tourisme/gastronomy/rating';



  constructor(private http: HttpClient) { }

  rateReservation(guideId: number, rating: number): Observable<any> {
    return this.http.post(`http://localhost:8089/tourisme/Guide/rate/${guideId}`, { rating });
  }
  submitRating(gastronomyId: number, rating: number) {
    return this.http.post<DetailGastronomy>(`${this.apiUrl}/${gastronomyId}`, { rating });
  }
}



