import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { CustomerService } from './shared/services/customer/customer.service';
import { CustomerEffects } from './state/customer.effects';
import { reducer } from './state/customer.reducer';

const routes: Routes = [
  { path: '', component: CustomerListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('customers', reducer),
    EffectsModule.forFeature(
      [ CustomerEffects ]
    ),
    FormsModule,
    CommonModule
  ],
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerFormComponent,
    CustomerListComponent
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
