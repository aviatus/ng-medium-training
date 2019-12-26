import { Component, OnInit } from '@angular/core';

import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];
  selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      console.log('successful delete');
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.selectedCustomer = undefined;
    });
  }
}
