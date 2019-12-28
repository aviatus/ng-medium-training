import { Component, OnChanges, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/index';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;

  constructor(private store: Store<fromCustomer.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromCustomer.getCurrentCustomer)).subscribe((customer) => this.customer = customer);
  }

  deleteCustomer() {
    this.store.dispatch(new customerActions.DeleteCustomer(this.customer.id));
    this.store.dispatch(new customerActions.ClearCurrentCustomer());
  }
}
