
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GuideService } from 'src/app/services/guide.service';
import { Guide } from 'src/app/models/guide.model';
@Component({
  selector: 'app-detailsbackguide',
  templateUrl: './detailsbackguide.component.html',
  styleUrls: ['./detailsbackguide.component.css']
})
export class DetailsbackguideComponent {
goBack() {
  this.router.navigate(['/dashboard/listeguide']);

}
contactGuide() {
throw new Error('Method not implemented.');
}
  Guide: Guide | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;
  ratingStars = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  constructor(
    private route: ActivatedRoute,
    private GuideService: GuideService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.GuideService.getGuideById(id).subscribe({
        next: (data: Guide) => {
          this.Guide = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la récupération des détails de la réservation.';
          this.isLoading = false;
          console.error('Erreur :', error);
        }
      });
    } else {
      this.errorMessage = 'ID de réservation manquant dans l\'URL.';
      this.isLoading = false;
    }
  }
}




