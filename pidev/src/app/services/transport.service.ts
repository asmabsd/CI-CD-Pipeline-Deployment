import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from '../models/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private baseUrl = 'http://localhost:8089/tourisme/transport'; // adapte si besoin
  private apiUrl = 'http://localhost:8089/tourisme/transport/addTransport'; // adapte si besoin
   // adapte si besoin

  constructor(private http: HttpClient) { }

  getAllTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(`${this.baseUrl}`);
  }

  addTransport(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(`${this.apiUrl}`, transport);
  }

  getTransportById(id: number): Observable<Transport> {
    return this.http.get<Transport>(`${this.baseUrl}/${id}`);
  }

  updateTransport(id: number, transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(`${this.baseUrl}/${id}`, transport);
  }

  deleteTransport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getRemainingCapacity(transportId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8089/tourisme/reservationtransport/${transportId}/remaining-capacity`);
  }
  
  
}
