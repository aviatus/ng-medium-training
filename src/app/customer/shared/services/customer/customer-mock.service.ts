import { Observable, of } from 'rxjs';

import { Customer } from '../../customer.model';

export class CustomerMockService {
  customers: Customer[] = [
    { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
    { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
  ];

  constructor() { }

  getCustomer(id: string): Observable<Customer> {
    const customer = this.customers.filter(customer => customer.id === id)[0];
    return of(customer);
  }

  getCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    if (customer.id) {
      customer.id = 'UpdateCustomer';
      return of(customer);
    }
    customer.id = 'Created Customer';
    return of(customer);
  }

  deleteCustomer(id: string): Observable<boolean> {
    return of(true);
  }
}
