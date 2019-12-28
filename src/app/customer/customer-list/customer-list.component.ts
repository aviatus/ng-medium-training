import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/index';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  activeCustomer: Customer;

  constructor(private store: Store<fromCustomer.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.Load());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomer));
    this.store.pipe(select(fromCustomer.getCurrentCustomer)).subscribe((customer) => this.activeCustomer = customer);
  }

  setActiveCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.SetCurrentCustomer(customer));
  }

  createCustomer() {
    this.store.dispatch(new customerActions.ClearCurrentCustomer());
    this.router.navigate(['customer/new']);
  }
}
