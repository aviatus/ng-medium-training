import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  {
    path: 'customer', component: CustomerComponent, children: [
      { path: '', component: CustomerListComponent },
      { path: 'new', component: CustomerFormComponent },
      { path: 'edit', component: CustomerFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
