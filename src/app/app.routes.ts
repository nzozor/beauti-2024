import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

export const routes: Routes = [  {
  path: '',
  // component: HomePageComponent
  loadComponent: () => import('./home-page/home-page.component').then(x => x.HomePageComponent)
},
  {
    path: 'treatments',
    loadComponent: () => import('./treatments/treatments/treatments.component').then(x => x.TreatmentsComponent)
  },
  // {
  //   path: 'consultation',
  //   loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
  // },
  // {
  //   path: 'about-us',
  //   loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule)
  // },
  // {path: '**', component: PageNotFoundComponent}
];


