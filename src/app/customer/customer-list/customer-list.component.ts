import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import * as fromCustomer from '../state/index';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  activeCustomer$: Observable<Customer>;

  constructor(private store: Store<fromCustomer.CustomerState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(fromCustomer.Load());
    this.customers$ = this.store.pipe(select(fromCustomer.selectAllCustomers));
    this.activeCustomer$ = this.store.pipe(select(fromCustomer.getCurrentCustomer));
  }

  setActiveCustomer(customer: Customer) {
    this.store.dispatch(fromCustomer.SetCurrentCustomer({customer}));
  }

  createCustomer() {
    this.store.dispatch(fromCustomer.ClearCurrentCustomer());
    this.router.navigate(['customer/new']);
  }

  deleteCustomer(customer: Customer) {
    this.store.dispatch(fromCustomer.DeleteCustomer({delete: customer}));
  }
}
