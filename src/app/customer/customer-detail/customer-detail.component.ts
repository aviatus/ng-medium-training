import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @Input() customer: Customer;
  @Output() deleteUser = new EventEmitter<Customer>();

  constructor() { }

  deleteCustomer() {
    this.deleteUser.emit(this.customer);
  }
}
