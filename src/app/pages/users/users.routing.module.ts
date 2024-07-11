import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './components/create-users/create-users.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUsersComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
