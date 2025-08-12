import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/services/transport.service';
import { Transport } from 'src/app/models/transport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listetransports',
  templateUrl: './listetransports.component.html',
  styleUrls: ['./listetransports.component.css']
})
export class ListetransportsComponent implements OnInit {

  transports: Transport[] = [];
  transportForm: FormGroup;
  submitted = false;
  searchType: string = '';
  searchLieu: string = '';
  

  types: string[] = ['Taxi', 'Bus', 'Train', 'Voiture de location'];
  gouvernorats: string[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte',
    'Beja', 'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia',
    'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Sfax', 'Gabès', 'Medenine',
    'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
  ];

  constructor(
    private transportService: TransportService,
    private fb: FormBuilder
  ) {
    this.transportForm = this.fb.group({
      type: ['', Validators.required],
      disponibilite: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTransports();
  }

  getAllTransports(): void {
    this.transportService.getAllTransports().subscribe(data => {
      this.transports = data;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.transportForm.invalid) return;
  
    this.transportService.addTransport(this.transportForm.value).subscribe({
      next: () => {
        this.getAllTransports();
        this.transportForm.reset();
        this.submitted = false;
  
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Transport ajouté avec succès !',
          confirmButtonColor: '#3085d6'
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout.'
        });
      }
    });
  }
  deleteTransport(id: number | undefined): void {
    if (!id) return;
  
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transportService.deleteTransport(id).subscribe(() => {
          this.getAllTransports(); // recharge la liste
          Swal.fire({
            title: 'Supprimé !',
            text: 'Le transport a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
        });
      }
    });
  }
  
  filteredTransports() {
    return this.transports.filter(t =>
      (this.searchType === '' || t.type === this.searchType) &&
      (this.searchLieu === '' || t.location === this.searchLieu)
    );
  }
  resetFilters() {
    this.searchType = '';
    this.searchLieu = '';
  }
  getFilteredAvailableCount(): number {
    return this.filteredTransports().filter(t => t.disponibilite === 'Disponible').length;
  }
  getFilteredUnavailableCount(): number {
    return this.filteredTransports().filter(t => t.disponibilite === 'Non disponible').length;
  }
}
