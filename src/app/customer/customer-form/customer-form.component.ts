import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = { id: '', createdAt: '', name: '', avatar: '', description: '' };
  id: string;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getCustomer();
      }
    });
  }

  getCustomer() {
    this.customerService.getCustomer(this.id).subscribe((customer: Customer) => {
      this.customer = customer;
    });
  }

  onSubmit() {
    this.customerService.updateCustomer(this.customer).subscribe(() => this.router.navigate(['/']));
  }
}
