import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'signin',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/signin/signin.page').then( m => m.SigninPage)
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
      }
    ],
  },
  {
    path: 'pastquestions',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/pastquestions/pastquestions.page').then( m => m.PastquestionsPage)
      },
      {
        path: 'subject/:id',
        loadComponent: () => import('./pages/pastquestionslist/pastquestionslist.page').then( m => m.PastquestionslistPage)
      }
    ],
  },
];
