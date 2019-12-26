import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './customer/shared/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerComponent,
    CustomerFormComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
