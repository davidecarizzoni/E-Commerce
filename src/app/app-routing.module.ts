import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './core/guards/login-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./features/signup/signup.module').then(m => m.SignupModule) },
  { path: 'customize', loadChildren: () => import('./features/customize/customize.module').then(m => m.CustomizeModule), canLoad: [LoginGuardService] },
  { path: 'customize/:id', loadChildren: () => import('./features/customize/customize.module').then(m => m.CustomizeModule), canLoad: [LoginGuardService] },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canLoad: [LoginGuardService] },
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule),canLoad: [LoginGuardService]  },
  { path: '**', loadChildren: () => import('./features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

