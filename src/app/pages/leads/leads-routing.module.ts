import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableLeadsComponent } from './components/table-lead/table-lead.component';

const routes: Routes = [
  {
    path: '',
    component: TableLeadsComponent
  },
  {
    path: '**',
    component: TableLeadsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
