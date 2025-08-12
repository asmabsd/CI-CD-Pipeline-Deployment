import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportService } from 'src/app/services/transport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifiertransport',
  templateUrl: './modifiertransport.component.html',
  styleUrls: ['./modifiertransport.component.css']
})
export class ModifiertransportComponent implements OnInit {

  transportForm!: FormGroup;
  id!: number;
  types: string[] = ['Taxi', 'Bus', 'Train', 'Voiture de location'];
  gouvernorats: string[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte',
    'Beja', 'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia',
    'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Sfax', 'Gabès', 'Medenine',
    'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private transportService: TransportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadTransport();
  }

  initForm() {
    this.transportForm = this.fb.group({
      type: ['', Validators.required],
      disponibilite: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  loadTransport() {
    this.transportService.getTransportById(this.id).subscribe(t => {
      this.transportForm.patchValue(t);
    });
  }

  onSubmit() {
    if (this.transportForm.invalid) return;

    this.transportService.updateTransport(this.id, this.transportForm.value).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Transport modifié avec succès !',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/dashboard/listetransports']);
      });
    });
  }
}
