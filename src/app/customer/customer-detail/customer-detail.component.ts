import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  @Output() delete = new EventEmitter<string>();
  @Input() customer: Customer = new Customer();

  ngOnInit() {
  }

  deleteCustomer() {
    this.delete.emit(this.customer.id);
  }
}
