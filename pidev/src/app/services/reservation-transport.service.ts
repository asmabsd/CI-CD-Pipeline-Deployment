import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationTransport } from '../models/ReservationTransport.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationTransportService {

  private baseUrl = 'http://localhost:8089/tourisme/reservationtransport';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ReservationTransport[]> {
    return this.http.get<ReservationTransport[]>(this.baseUrl);
  }

  getById(id: number): Observable<ReservationTransport> {
    return this.http.get<ReservationTransport>(`${this.baseUrl}/${id}`);
  }

  addReservation(userId: number, transportId: number, reservation: ReservationTransport): Observable<ReservationTransport> {
    return this.http.post<ReservationTransport>(`${this.baseUrl}/user/${userId}/transport/${transportId}`, reservation);
  }

  updateReservation(id: number, reservation: ReservationTransport): Observable<ReservationTransport> {
    return this.http.put<ReservationTransport>(`${this.baseUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getByUserId(userId: number): Observable<ReservationTransport[]> {
    return this.http.get<ReservationTransport[]>(`${this.baseUrl}/user/${userId}`);
  }
  getRemainingCapacity(transportId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8089/reservationtransport/${transportId}/remaining-capacity`);
  }
  
}