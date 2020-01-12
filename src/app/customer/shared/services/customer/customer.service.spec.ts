import { of } from 'rxjs';

import { Customer } from '../../customer.model';
import { CustomerService } from './customer.service';

describe('Customer Service', () => {
  let service: CustomerService;

  describe('service get customers', () => {
    let httpClientSpyGet: { get: jasmine.Spy };

    beforeEach(() => {
      httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
      service = new CustomerService(httpClientSpyGet as any);
    });

    it('should get customers', () => {
      const expectedCustomers = [new Customer(), new Customer()];

      httpClientSpyGet.get.and.returnValue(of(expectedCustomers));
      service.getCustomers().subscribe((customers) => expect(customers).toEqual(expectedCustomers, 'expected customer'), fail);
      expect(httpClientSpyGet.get.calls.count()).toBe(1, 'one call');
    });
  });

  describe('service update customer', () => {
    let httpClientSpyPut: { put: jasmine.Spy };

    beforeEach(() => {
      httpClientSpyPut = jasmine.createSpyObj('HttpClient', ['put']);
      service = new CustomerService(httpClientSpyPut as any);
    });

    it('should update customer', () => {
      const expectedCustomer = { id: 'Test', name: 'Test', description: 'Test', avatar: 'Test', createdAt: 'Test' };

      httpClientSpyPut.put.and.returnValue(of(expectedCustomer));

      service.updateCustomer(expectedCustomer).subscribe(customer => expect(customer).toEqual(expectedCustomer, 'expected customer'), fail);
      expect(httpClientSpyPut.put.calls.count()).toBe(1, 'one call');
    });
  });

  describe('service create customer', () => {
    let httpClientSpyPost: { post: jasmine.Spy };

    beforeEach(() => {
      httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
      service = new CustomerService(httpClientSpyPost as any);
    });

    it('should create customer', () => {
      const expectedCustomer = new Customer();

      httpClientSpyPost.post.and.returnValue(of(expectedCustomer));

      service.createCustomer(expectedCustomer).subscribe(customer => expect(customer).toEqual(expectedCustomer, 'expected customer'), fail);
      expect(httpClientSpyPost.post.calls.count()).toBe(1, 'one call');
    });
  });

  describe('service delete customer', () => {
    let httpClientSpyDelete: { delete: jasmine.Spy };

    beforeEach(() => {
      httpClientSpyDelete = jasmine.createSpyObj('HttpClient', ['delete']);
      service = new CustomerService(httpClientSpyDelete as any);
    });

    it('should delete customer', () => {
      const expectedCustomer = new Customer();
      const id = '1';

      httpClientSpyDelete.delete.and.returnValue(of(expectedCustomer));

      service.deleteCustomer(id).subscribe(customer => expect(customer).toEqual(expectedCustomer, 'expected customer'), fail);
      expect(httpClientSpyDelete.delete.calls.count()).toBe(1, 'one call');
    });
  });
});
