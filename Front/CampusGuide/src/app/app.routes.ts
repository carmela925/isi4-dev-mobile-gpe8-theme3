import { Routes } from '@angular/router';
import { ForgetPwdComponent } from './pages/forget-pwd/forget-pwd.component';

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
      },
      { path: 'forget-password',
        component: ForgetPwdComponent
      },
    ],
  }
];
