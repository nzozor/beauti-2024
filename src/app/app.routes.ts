import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {PageNotFoundComponent} from "@app/shared/components/page-not-found/page-not-found.component";

export const routes: Routes = [  {
  path: '',
  loadComponent: () => import('./home-page/home-page.component').then(x => x.HomePageComponent)
},
  {
    path: 'treatments',
    loadComponent: () => import('./treatments/treatments/treatments.component').then(x => x.TreatmentsComponent),
  },
  {
    path: 'treatments/:slug',
    loadComponent: () => import('./treatments/treatment-showcase/treatment-showcase.component').then(x => x.TreatmentShowcaseComponent)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.component').then(x => x.AboutUsComponent)
  },
  {
    path: 'consultation',
    loadComponent: () => import('./consultation/consultation/consultation.component').then(x => x.ConsultationComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(x => x.ContactComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(x => x.PrivacyPolicyComponent)
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];


