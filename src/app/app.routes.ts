import { Routes } from '@angular/router';
import { ContainerComponent } from './presentation/layout/container/container.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
