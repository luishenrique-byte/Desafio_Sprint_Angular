import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/pages/index/index.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'index', component: IndexComponent},
    {path: 'dashboard', component: DashboardComponent}
];
// @NgModule serve para agrupar componentes, serviços e confgurações que pertencem a uma mesma parte da aplicação.
@NgModule({
    //O RouterModule gerencia as rotas, o forRoot recebe uma lista de rotas que você definiu (em Routes (linha: 8))
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}