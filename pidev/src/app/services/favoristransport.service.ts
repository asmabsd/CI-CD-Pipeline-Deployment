import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transport } from '../models/transport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoristransportService {

  private baseUrl = 'http://localhost:8089/tourisme/favoris'; // 🔥 URL du Backend

  constructor(private http: HttpClient) { }

  // 👉 Récupérer les favoris de l'utilisateur connecté
  getFavoris(): Observable<Transport[]> {
    return this.http.get<Transport[]>(`${this.baseUrl}`);
  }

  // 👉 Ajouter un transport aux favoris
  addFavori(userId: number, transportId: number) {
    return this.http.post(`${this.baseUrl}/add`, {
      userId,
      transportId
    });
  }

  // 👉 Supprimer un transport des favoris
  removeFavori(transportId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${transportId}`);
  }

  // 👉 Vider tous les favoris
  clearFavoris(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
