import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from '../app.component';

import { AfficherplanningComponent } from './pages/afficherplanning/afficherplanning.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { StatsguideComponent } from './pages/statsguide/statsguide.component';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import { GuideComponent } from '../frontend/pages/guide/guide.component';
import { AddUserComponent } from './pages/adduser/adduser.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { BackComponent } from './pages/back/back.component';

import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { DetailsbackguideComponent } from './pages/detailsbackguide/detailsbackguide.component';
import { AddplanningComponent } from './pages/addplanning/addplanning.component';
import { AuthGuard } from '../auth.guard';
import { ListeguideComponent } from './pages/listeguide/listeguide.component';
import { AddguideComponent } from './pages/addguide/addguide.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RouterLink, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditguideComponent } from './pages/editguide/editguide.component';
import { GastronomyComponent } from './pages/gastronomy/gastronomy.component';
import { MenusComponent } from './pages/menus/menus.component';
import { GastronomyStatsComponent } from './pages/statistics/gastronomy-stats/gastronomy-stats.component';
import { DashboardPartnerComponent } from './pages/dashboard-partner/dashboard-partner.component';
import { HebergementComponent } from './pages/hebergement/hebergement.component';
import { ToastrModule } from 'ngx-toastr';
import { AddhebergementComponent } from './pages/addhebergement/addhebergement.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { HebergementDetailsComponent } from './pages/hebergement-details/hebergement-details.component';
import { ReservationChambreComponent } from './pages/reservation-chambre/reservation-chambre.component';
import { ReservationEditComponent } from './pages/reservation-edit/reservation-edit.component';
import { UpdateHebergementComponent } from './pages/update-hebergement/update-hebergement.component';
import { AddActivityComponent } from './pages/add-activity/add-activity.component';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';
import { AddblogComponent } from './pages/addblog/addblog.component';
import { EditActivityComponent } from './pages/edit-activity/edit-activity.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogActivityAffectationComponent } from './pages/blog-activity-affectation/blog-activity-affectation.component';
import { ListetransportsComponent } from './pages/listetransports/listetransports.component';
import { ModifiertransportComponent } from './pages/modifiertransport/modifiertransport.component';
import { DetailstransportComponent } from './pages/detailstransport/detailstransport.component';
import { ListreservationtransportComponent } from './pages/listreservationtransport/listreservationtransport.component';
// import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe'; // Ensure this file exists at the specified path or update the path to the correct location.

import { StoreListComponent } from './pages/GestionSouvenir/store-list/store-list.component';
import { EditStoreComponent } from './pages/GestionSouvenir/edit-store/edit-store.component';
import { AddStoreComponent } from './pages/GestionSouvenir/add-store/add-store.component';
import { ViewStoreComponent } from './pages/GestionSouvenir/view-store/view-store.component';
import { AddSouvenirComponent } from './pages/GestionSouvenir/add-souvenir/add-souvenir.component';
import { SouvenirListComponent } from './pages/GestionSouvenir/souvenir-list/souvenir-list.component';
import { EditSouvenirComponent } from './pages/GestionSouvenir/edit-souvenir/edit-souvenir.component';
import { ViewSouvenirComponent } from './pages/GestionSouvenir/view-souvenir/view-souvenir.component';
import { SharedModule } from '../shared/shared.module';
import { StoreListOfPartnerComponent } from '../frontend/pages/GestionSouvenir/store-list-of-partner/store-list-of-partner.component';
import { SouvenirListOfPartnerByStoreComponent } from '../frontend/pages/GestionSouvenir/souvenir-list-of-partner-by-store/souvenir-list-of-partner-by-store.component';
import { StoreSalesComponent } from '../frontend/pages/GestionSouvenir/store-sales/store-sales.component';
import { AddStorePartnerComponent } from '../frontend/pages/GestionSouvenir/add-store-partner/add-store-partner.component';
import { AddSouvenirPartnerComponent } from '../frontend/pages/GestionSouvenir/add-souvenir-partner/add-souvenir-partner.component';
import { EditStorePartnerComponent } from '../frontend/pages/GestionSouvenir/edit-store-partner/edit-store-partner.component';
import { EditSouvenirPartnerComponent } from '../frontend/pages/GestionSouvenir/edit-souvenir-partner/edit-souvenir-partner.component';
import { SafeHtmlPipe } from '../shared/pipe/safeHtml.pipe';






/*asma path    { path: 'home', component: HomeComponent }, // Add this route

      { path: 'statsguide', component: StatsguideComponent }, // Add this route

      {path: 'editguide/:id', component: EditguideComponent },
      {path: 'detailsbackguide/:id', component: DetailsbackguideComponent },
      {path: 'addplanning', component: AddplanningComponent },
      {path: 'afficherplanning', component: AfficherplanningComponent },
  
      {path: 'back',component : BackComponent},
      {path: 'listeguide',component : ListeguideComponent},
  
      { path: 'addguide', component: AddguideComponent },  // ✅ AddGuideComponent should be correctly declared
     
      { path: 'adduser', component: AddUserComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'edit-user/:id', component: EditUserComponent }
    ]
  },
  { path: 'guide', component: GuideComponent }
];

*/
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      //{ path: 'gastronomy', component: GastronomyComponent },
      //{ path: 'gastronomy-stats', component: GastronomyStatsComponent },
      { path: 'listetransports', component: ListetransportsComponent },
      { path: 'modifiertransport/:id', component: ModifiertransportComponent },
      { path: 'detailstransport/:id', component: DetailstransportComponent },
      {path: 'listereservations',component: ListreservationtransportComponent},
      { path: 'editguide/:id', component: EditguideComponent },
      { path: 'detailsbackguide/:id', component: DetailsbackguideComponent },
      { path: 'addplanning', component: AddplanningComponent },
      { path: 'afficherplanning', component: AddplanningComponent },
      { path: 'menu', component: MenusComponent },
      { path: 'back', component: BackComponent },
      { path: 'listeguide', component: ListeguideComponent },
      { path: 'addguide', component: AddguideComponent },
      { path: 'adduser', component: AddUserComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'gethebback', component: HebergementComponent },
      { path: 'addhebergement', component: AddhebergementComponent },
      { path: 'updatehebergement/:id', component: UpdateHebergementComponent },
      {
        path: 'hebergement-details/:id',
        component: HebergementDetailsComponent,
      },
      { path: 'reserver-chambre/:id', component: ReservationChambreComponent },
      {
        path: 'modifierr-reservation/:id',
        component: ReservationEditComponent,
      },
      { path: 'addreserver/:id', component: AddReservationComponent },
      { path: 'activities/add', component: AddActivityComponent },
      { path: 'activities', component: ActivityListComponent },
      { path: 'blog/add', component: AddblogComponent },
      { path: 'activities/edit/:id', component: EditActivityComponent },
      { path: 'blog/edit/:id', component: EditBlogComponent },
      { path: 'blog', component: BlogListComponent }, // Add this route
      {
        path: 'blog/activity-affectation',
        component: BlogActivityAffectationComponent,
      },

      { path: 'home', component: HomeComponent }, // Add this route

      { path: 'statsguide', component: StatsguideComponent }, // Add this route

      { path: 'editguide/:id', component: EditguideComponent },
      { path: 'detailsbackguide/:id', component: DetailsbackguideComponent },
      { path: 'addplanning', component: AddplanningComponent },
      { path: 'afficherplanning', component: AfficherplanningComponent },

      { path: 'back', component: BackComponent },
      { path: 'listeguide', component: ListeguideComponent },

      { path: 'addguide', component: AddguideComponent }, // ✅ AddGuideComponent should be correctly declared

      { path: 'adduser', component: AddUserComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'edit-user/:id', component: EditUserComponent },

      { path: 'storeList', component: StoreListComponent },
      { path: 'addStore', component: AddStoreComponent },
      { path: 'editStore/:id', component: EditStoreComponent },
      { path: 'viewStore/:id', component: ViewStoreComponent },
      { path: 'viewSouvenir/:id', component: ViewSouvenirComponent },
      { path: 'souvenirList', component: SouvenirListComponent },
      { path: 'addSouvenir', component: AddSouvenirComponent },
      { path: 'editSouvenir/:id', component: EditSouvenirComponent },
    
    
    ],
  },
  { path: 'guide', component: GuideComponent },
  {
    path: 'partnerdashboard',
    component: DashboardPartnerComponent,
    children: [
      { path: 'gastronomy', component: GastronomyComponent },
      { path: 'gastronomy-stats', component: GastronomyStatsComponent },

      { path: 'AddStorePartner', component: AddStorePartnerComponent },
      { path: 'addSouvenirPartner/:id', component: AddSouvenirPartnerComponent },
      { path: 'editStorePartner/:id', component: EditStorePartnerComponent },
      { path: 'editSouvenirPartner/:id', component: EditSouvenirPartnerComponent },
      { path: 'storeListOfPartner', component: StoreListOfPartnerComponent },
      {
        path: 'souvenirListOfPartnerByStore/:id',
        component: SouvenirListOfPartnerByStoreComponent,
      },
      { path: 'store-sales/:id', component: StoreSalesComponent }
      
    ],
  },
];

@NgModule({
  declarations: [
    StatsguideComponent,
    
    AfficherplanningComponent,
    EditguideComponent,
    DashboardComponent,
    AddUserComponent,
    UserListComponent,
    EditUserComponent,
    DetailsbackguideComponent,
    AddplanningComponent,
   
    AddguideComponent, // ✅ Ensure AddGuideComponent is declared here
    ListeguideComponent,
    BackComponent,
    
    NavbarComponent,
    EditguideComponent,
    DashboardComponent,
  
    UserListComponent,
    EditUserComponent,
    DetailsbackguideComponent,
   
    AddguideComponent,
    ListeguideComponent,
    BackComponent,
    MenusComponent,
    GastronomyComponent,
    GastronomyStatsComponent,
    DashboardPartnerComponent,
    HebergementComponent,
    AddhebergementComponent,
    AddReservationComponent,
    HebergementDetailsComponent,
    ReservationChambreComponent,
    ReservationEditComponent,
    AddActivityComponent,
    ActivityListComponent,
    AddblogComponent,
    EditActivityComponent,
    EditBlogComponent,
    BlogListComponent,
    BlogActivityAffectationComponent,
    UpdateHebergementComponent,
   
 
     SafeHtmlPipe, // Ensure SafeHtmlPipe is correctly imported annservi ???
    
    ListetransportsComponent,
    ModifiertransportComponent,
    DetailstransportComponent,
    ListreservationtransportComponent,


    StoreListComponent,
    EditStoreComponent,
    AddStoreComponent,
    ViewStoreComponent,
    AddSouvenirComponent,
    SouvenirListComponent,
    EditSouvenirComponent,
    ViewSouvenirComponent,
    

  ],
  imports: [
  
    FullCalendarModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // ou 'toast-top-center', etc.
      timeOut: 3000,
    }),
    SharedModule,
  ],
  exports: [RouterModule, RouterLink],
})
export class BackendModule {}
