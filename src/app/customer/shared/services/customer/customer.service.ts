import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../../customer.model';

@Injectable()
export class CustomerService {
  URL = 'http://5dfccebd31f32a0014c825b7.mockapi.io/user';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.URL + '/' + customer.id, customer);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.URL + '/', customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }
}
