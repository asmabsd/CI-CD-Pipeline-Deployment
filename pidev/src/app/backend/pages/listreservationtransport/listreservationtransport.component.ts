import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationTransport } from 'src/app/models/ReservationTransport.model';
import { ReservationTransportService } from 'src/app/services/reservation-transport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listreservationtransport',
  templateUrl: './listreservationtransport.component.html',
  styleUrls: ['./listreservationtransport.component.css']
})
export class ListreservationtransportComponent implements OnInit {

  reservations: ReservationTransport[] = [];
  reservationForm!: FormGroup;

  // Liste des gouvernorats tunisiens
  gouvernorats: string[] = ['Tunis', 'Sousse', 'Monastir', 'Mahdia', 'Kairouan'];

  // À adapter dynamiquement plus tard
  userId = 1;
  transportId = 1;

  // Coordonnées GPS pour calculer la distance
  coordinates: Record<string, [number, number]> = {
    Tunis: [36.8065, 10.1815],
    Sousse: [35.8256, 10.6084],
    Monastir: [35.777, 10.8262],
    Mahdia: [35.5047, 11.0622],
    Kairouan: [35.6781, 10.0963],
  };

  constructor(
    private reservationService: ReservationTransportService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchReservations();
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      departPoint: ['', Validators.required],
      destination: ['', Validators.required],
      departureHour: ['', Validators.required],
      nbrpersonne: [1, [Validators.required, Validators.min(1)]],
      idTransport: ['', Validators.required],
    idUser: ['', Validators.required]



    });
  }

  fetchReservations(): void {
    this.reservationService.getAll().subscribe({
      next: (data) => this.reservations = data,
      error: (err) => console.error('Erreur lors du chargement des réservations', err)
    });
  }

 

  deleteReservation(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette réservation sera supprimée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(id).subscribe(() => {
          Swal.fire('Supprimé', 'Réservation supprimée', 'success');
          this.fetchReservations();
        });
      }
    });
  }
  submitReservation(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      console.log('Données envoyées :', reservationData);
      // this.reservationService.createReservation(reservationData).subscribe(...)
    }
  }
  
}
