import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
  URL = 'http://5dfccebd31f32a0014c825b7.mockapi.io/user';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.URL);
  }

  getCustomer(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  updateCustomer(customer: Customer) {
    if (customer.id) {
      return this.http.put(this.URL + '/' + customer.id, customer);
    } else {
      return this.http.post(this.URL + '/', customer);
    }
  }

  deleteCustomer(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }
}
