import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import * as customerActions from '../state/actions/customer.actions';
import * as fromCustomer from '../state/index';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = new Customer();

  constructor(private router: Router,
              private store: Store<fromCustomer.State>) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.store.pipe(select(fromCustomer.getCurrentCustomer)).subscribe((customer) => {
      if (customer) {
        this.customer = customer;
      }
    });
  }

  onSubmit() {
    if (this.customer.id) {
      this.store.dispatch(new customerActions.UpdateCustomer(this.customer));
    } else {
      this.store.dispatch(new customerActions.CreateCustomer(this.customer));
    }
    this.router.navigate(['/']);
  }

  goBack() {
    this.store.dispatch(new customerActions.ClearCurrentCustomer());
    this.router.navigate(['/']);
  }
}
