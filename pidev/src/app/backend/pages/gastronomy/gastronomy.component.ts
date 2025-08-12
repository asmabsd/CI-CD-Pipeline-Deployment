import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GastronomyService } from 'src/app/services/gastronomy.service';
import { Gastronomy } from 'src/app/models/gastronomy.model';
import { GastronomyType } from 'src/app/models/gastronomy-type.model'; // <-- ajout
import { Router } from '@angular/router';  // Importer Router
import { Menu } from 'src/app/models/menu.model';
import { Plate } from 'src/app/models/Plate';
import { MenuService } from 'src/app/services/menu.service';
import { PlateService } from 'src/app/services/plate.service';
import { forkJoin } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { DetailGastronomyService } from 'src/app/services/detailgastronomy.service';



@Component({
  selector: 'app-gastronomy',
  templateUrl: './gastronomy.component.html',
  styleUrls: ['./gastronomy.component.css']
})
export class GastronomyComponent implements OnInit {
  gastronomyForm!: FormGroup;
  gastronomies: Gastronomy[] = [];

  plates: Plate[] = [];
  baseImageUrl: string = "http://localhost:8089/tourisme/images/";
  errorMessage: string = '';
    selectedGastronomy: Gastronomy | null = null;
  gastronomyTypes = Object.values(GastronomyType);
gastronomy: any;
selectedImage: File | null=null ;
imagePreview: any;
  http: any;
  advice: string = ''; // Variable pour stocker la réponse des conseils

  constructor(private fb: FormBuilder, 
    private gastronomyService: GastronomyService, 
    private menuService: MenuService,
    private plateService: PlateService,
    private detailService : DetailGastronomyService,

     private router: Router,  // Injecter Router ici
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllGastronomies();
  }
  goToStatistics(): void {
    this.router.navigate(['/dashboard/gastronomy-stats']); // Assure-toi que '/statistics' est le chemin de ta page de statistiques
  }
  initForm() {
    this.gastronomyForm = this.fb.group({
      name: ['', Validators.required],
      type: [''],
      location: ['', Validators.required],
      image: [null, Validators.required],
      detailGastronomy: this.fb.group({
        description: ['', Validators.required],
        rating: [0, Validators.required]
      }),
      menus: this.fb.array([this.createMenu()]) // Ajouter un menu vide par défaut
    });
  }
  
  createMenu() {
    return this.fb.group({
      nameMenu: ['', Validators.required],
      descriptionMenu: ['', Validators.required],
      prixMenu: [0, Validators.required],
      plates: this.fb.array([])

    });
  }
  
  
  
  getPlatesControls(menuIndex: number): FormArray {
    return (this.menus.at(menuIndex).get('plates') as FormArray);
  }
  
  addPlate(menuIndex: number): void {
    const plates = this.getPlatesControls(menuIndex);
    plates.push(this.fb.group({
      namePlate: [''],
      descriptionPlate: [''],
      pricePlate: [0],
     // imagePlate: [null]
    }));
  }
  onPlateImageSelected(event: any, menuIndex: number, plateIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const platesArray = this.getPlatesControls(menuIndex);
      const plateGroup = platesArray.at(plateIndex) as FormGroup;
      plateGroup.patchValue({ imagePlate: file });
      plateGroup.get('imagePlate')?.updateValueAndValidity();
    }
  }
  
  removePlate(menuIndex: number, plateIndex: number): void {
    const plates = this.getPlatesControls(menuIndex);
    plates.removeAt(plateIndex);
  }
  
  get menusValid(): boolean {
    return this.menus.controls.every(menu => menu.valid); // Vérifie si chaque menu est valide
  }
  
  get menus(): FormArray {
    return this.gastronomyForm.get('menus') as FormArray;
  }


    getAllGastronomies() {
      forkJoin([
        this.gastronomyService.getAll(),
        this.plateService.getAllPlates()
      ]).subscribe({
        next: ([gastronomiesData, platesData]) => {
          // Traiter les gastronomies
          this.gastronomies = gastronomiesData;
          this.gastronomies.forEach(gastronomy => {
            if (gastronomy.image && !gastronomy.image.startsWith('http')) {
              gastronomy.image = this.baseImageUrl + gastronomy.image;
            }
          });
    
          // Traiter les plats
          this.plates = platesData;
          this.plates.forEach(plate => {
            if (plate.imagePlate && !plate.imagePlate.startsWith('http')) {
              plate.imagePlate = this.baseImageUrl + plate.imagePlate;
            }
          });
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des données';
          console.error(err);
        }
      });
    }
    getAllPlates() {
      this.plateService.getAllPlates().subscribe({
        next: (data) => {
          this.plates = data;
    
          this.plates.forEach(plate => {
            if (plate.imagePlate && !plate.imagePlate.startsWith('http')) {
              plate.imagePlate = this.baseImageUrl + plate.imagePlate;
            }
          });
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des plats';
          console.error(err);
        }
      });
    }
  
    addGastronomy() {
      if (this.gastronomyForm.valid && this.menusValid && this.selectedImage) {
        this.errorMessage = "Veuillez remplir tous les champs requis et sélectionner une image.";
        const formData = new FormData();
    
        const gastronomy = {
          name: this.gastronomyForm.value.name,
          type: this.gastronomyForm.value.type,
          location: this.gastronomyForm.value.location
        };
    
        // Ajouter les données gastronomie au FormData
        formData.append('gastronomy', new Blob([JSON.stringify(gastronomy)], { type: 'application/json' }));
    
        // Ajouter l'image au FormData
        formData.append('image', this.selectedImage);
    
        // Étape 1 : Ajouter la gastronomie avec l'image
        this.gastronomyService.createWithImage(formData).subscribe((createdGastronomy: any) => {
          console.log('Gastronomy added:', createdGastronomy);

          const gastronomyId: number = createdGastronomy.id;

          // Étape 2 : Ajouter les détails
          const detail = this.gastronomyForm.value.detailGastronomy;
          this.gastronomyService.addDetailGastronomyAndAffectGastronomy(gastronomyId, detail).subscribe((resDetail) => {
            console.log('Detail added and linked:', resDetail);
            
          });
    
          // Étape 3 : Ajouter les menus
          const menusToAdd = this.gastronomyForm.value.menus;
          const menuObservables = menusToAdd.map((menu: any) => {
            return this.gastronomyService.createMenu({
              nameMenu: menu.nameMenu,
              descriptionMenu: menu.descriptionMenu,
              prixMenu: menu.prixMenu,
              plates: menu.plates, // 👈 Ici on ajoute bien les plats
              gastronomy: { id: gastronomyId }
            }).toPromise();  // Convert Observable to Promise
          });
    
          // Exécuter les ajouts de menus
          Promise.all(menuObservables).then((menuResponses) => {
            console.log('Menus added and linked:', menuResponses);
            this.getAllGastronomies();
            this.gastronomyForm.reset();
            this.selectedImage = null;
          });
    
        }, (error) => {
          console.error('Erreur lors de l’ajout de la gastronomie :', error);
        });
      } else {
        console.warn('Formulaire invalide ou image non sélectionnée.');
      }
    }
    
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.gastronomyForm.patchValue({ image: file });
      this.gastronomyForm.get('image')?.updateValueAndValidity();
    }
  }
  

  editGastronomy(gastronomy: Gastronomy) {
    console.log('Gastronomy reçue:', gastronomy);
  
    this.selectedGastronomy = gastronomy;
  
    // Afficher l'image si elle existe
    this.selectedImage = null;
    this.imagePreview = gastronomy.image ? gastronomy.image : null;
  
    this.gastronomyForm.patchValue({
      name: gastronomy.name,
      type: gastronomy.type,
      location: gastronomy.location,
      image: gastronomy.image, // ← pas obligatoire car image = input type=file
      detailGastronomy: {
        description: gastronomy.detailGastronomy?.description || '',
        rating: gastronomy.detailGastronomy?.rating || 0
      }
    });
  
    this.menus.clear();
    if (gastronomy.menus) {
      gastronomy.menus.forEach(menu => {
        this.menus.push(this.fb.group({
          nameMenu: [menu.nameMenu, Validators.required],
          descriptionMenu: [menu.descriptionMenu, Validators.required],
          prixMenu: [menu.prixMenu, Validators.required],
          plates: this.fb.array(menu.plates?.map(plate => this.fb.group({
            namePlate: [plate.namePlate],
            descriptionPlate: [plate.descriptionPlate],
            pricePlate: [plate.pricePlate],
          })) || [])
        }));
      });
    }
  }
  
  
  
  updateGastronomy(): void {
    if (this.gastronomyForm.valid && this.selectedGastronomy) {
      const updatedGastronomy: Gastronomy = {
        ...this.selectedGastronomy,
        ...this.gastronomyForm.value
      };
  
      const formData = new FormData();
  
      const gastronomyBlob = new Blob(
        [JSON.stringify(updatedGastronomy)],
        { type: 'application/json' }
      );
      formData.append('gastronomy', gastronomyBlob);
  
      // ✅ Mise à jour du détail (via gastronomyForm)
      this.detailService.update(this.gastronomyForm.get('detailGastronomy')?.value).subscribe({
        next: (updatedDetail) => {
          console.log('Detail updated:', updatedDetail);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du détail', err);
        }
      });
  
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
  
      this.gastronomyService.update(formData).subscribe({
        next: (response) => {
          console.log('Gastronomy updated:', response);
          this.getAllGastronomies();
          this.selectedGastronomy = null;
          this.gastronomyForm.reset();
          this.selectedImage = null;
          this.imagePreview = null;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
        }
      });
    }
  }
  
  
  deleteGastronomy(id?: number) {
    if (id !== undefined) {
      this.gastronomyService.delete(id).subscribe(() => {
        console.log('Gastronomy deleted');
        this.getAllGastronomies();
      });
    }
  }

 
    addMenu() {
      const menuGroup = this.createMenu();
      this.menus.push(menuGroup);
    }
  
    goToAddPlate(menuId: number) {
      this.router.navigate(['/dashboard/menu'], { queryParams: { menuId } });
    }

  removeMenu(index: number) {
    this.menus.removeAt(index);
  }

  // Ajout de menus à une gastronomie
  addMenusToGastronomy(gastronomy: Gastronomy, menuIds: number[]) {
    if (gastronomy.id !== undefined) {
      this.gastronomyService.affectMenuToGastronomy(gastronomy.id, menuIds).subscribe(response => {
        console.log('Menus affectés:', response);
        // Effectuer d'autres actions après la réussite de l'appel
      });
    } else {
      console.error('ID de la gastronomie non défini');
    }
  }

  // Ajout de détails à la gastronomie
  addDetailToGastronomy(gastronomy: Gastronomy, detailGastronomy: any) {
    if (gastronomy.id !== undefined) {
      this.gastronomyService.addDetailGastronomyAndAffectGastronomy(gastronomy.id, detailGastronomy).subscribe(response => {
        console.log('Détails de la gastronomie ajoutés et affectés:', response);
        // Effectuer d'autres actions après la réussite de l'appel
      });
    } else {
      console.error('ID de la gastronomie non défini');
    }
  }

  showDetailIds: number[] = [];
showMenuIds: number[] = [];

/*toggleDetails(gastronomyId: number) {
  if (this.showDetailIds.includes(gastronomyId)) {
    this.showDetailIds = this.showDetailIds.filter(id => id !== gastronomyId);
  } else {
    this.gastronomyService.getById(gastronomyId).subscribe(gastronomy => {
      const index = this.gastronomies.findIndex(g => g.id === gastronomyId);
      if (index !== -1) {
        // Correction image ici :
        if (gastronomy.image && !gastronomy.image.startsWith('http')) {
          gastronomy.image = this.baseImageUrl + gastronomy.image;
        }
        this.gastronomies[index] = gastronomy;
        this.showDetailIds.push(gastronomyId);
      }
    });
  }
}*/
toggleDetails(id: number): void {
  const gastronomy = this.gastronomies.find(g => g.id === id);

  if (!gastronomy) {
    console.error('Gastronomie non trouvée pour l\'id', id);
    return;
  }

  // Vérifier si les détails de la gastronomie sont déjà récupérés
  if (gastronomy.detailGastronomy) {
    // Si les détails sont déjà récupérés, on les affiche
    console.log('Détail trouvé : ', gastronomy.detailGastronomy);
  } else {
    // Sinon, on fait une requête pour récupérer les détails
    this.gastronomyService.getDetailById(id).subscribe(
      (data) => {
        console.log('Données des détails récupérées : ', data);
        gastronomy.detailGastronomy = data; // Stocke les détails dans l'objet gastronomy

        // Ajouter l'ID à la liste des IDs pour afficher les détails
        this.showDetailIds.push(id);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails', error);
      }
    );
  }

  // Si le détail est déjà affiché, on le cache
  if (this.showDetailIds.includes(id)) {
    this.showDetailIds = this.showDetailIds.filter(detailId => detailId !== id);
  } else {
    this.showDetailIds.push(id); // Sinon, on ajoute l'ID pour l'afficher
  }
}



toggleMenus(id: number) {
  // Même logique pour les menus
  const index = this.showMenuIds.indexOf(id);
  if (index === -1) {
    this.showMenuIds.push(id);
  } else {
    this.showMenuIds.splice(index, 1);
  }
}
generateAdviceForGastronomy(): void {
  const gastronomyData = this.gastronomyForm.value;

  this.gastronomyService.generateAdvice(gastronomyData).subscribe(
    (response: any) => {
      // Vérifier que 'choices' existe et contient des éléments
      if (response && response.choices && response.choices.length > 0) {
        // Extraire le contenu du message à partir de 'choices[0].message.content'
        let adviceContent = response.choices[0].message.content;

        // Formater le contenu pour supprimer les # et * tout en gardant la structure HTML
        adviceContent = this.formatAdvice(adviceContent);

        this.advice = adviceContent || 'Conseil non disponible';
        console.log('Conseils reçus :', this.advice);
      } else {
        this.advice = 'Aucun conseil disponible.';
      }
    },
    (error) => {
      console.error('Erreur lors de la génération des conseils :', error);
      this.advice = 'Erreur lors de la génération des conseils';
    }
  );
}

// Fonction pour formater le texte des conseils en HTML sans # et *
formatAdvice(advice: string): string {
  // Remplacer les titres markdown (###) par des balises <h3>
  advice = advice.replace(/###\s(.+)/g, '<h3>$1</h3>');
  
  // Remplacer les listes (tirets) par des balises <ul> et <li>
  advice = advice.replace(/-\s(.+)/g, '<ul><li>$1</li></ul>');

  // Remplacer les sauts de ligne par un retour à la ligne HTML <br>
  advice = advice.replace(/\n/g, '<br>');

  return advice;
}




}
