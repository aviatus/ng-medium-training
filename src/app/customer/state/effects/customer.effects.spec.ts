
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Customer } from '../../shared/customer.model';
import { CustomerService } from '../../shared/services/customer/customer.service';
import * as fromActions from '../actions/customer.actions';
import * as fromReducer from '../reducers/customer.reducer';
import { CustomerEffects } from './customer.effects';

describe('Customer Effects', () => {
  let actions$: Observable<Action>;
  let service;
  let effects: CustomerEffects;

  const customers: Customer[] = [
    { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
    { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
  ];
  const customer: Customer = {
    id: 'Test3', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CustomerEffects,
        {
          provide: CustomerService, useFactory: () => jasmine.createSpyObj('CustomerService',
            ['getCustomers', 'updateCustomer', 'createCustomer', 'deleteCustomer'])
        },
        provideMockStore({ initialState: fromReducer.initialState }),
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.get<CustomerEffects>(CustomerEffects);
    service = TestBed.get<CustomerService>(CustomerService);
  });

  describe('Get Customer', () => {
    beforeEach(() => {
      const action = fromActions.Load();
      actions$ = hot('-a', { a: action });
    });

    it('should successful when get customers', () => {
      service.getCustomers.and.returnValue(of(customers));

      const completion = fromActions.LoadSuccess({ customers });
      const expected = cold('-b', { b: completion });

      expect(effects.loadCustomers$).toBeObservable(expected);
    });
  });


  describe('Create Customer', () => {
    beforeEach(() => {
      const action = fromActions.CreateCustomer({ create: customer });
      actions$ = hot('-a', { a: action });
    });

    it('should successful when  create customer', () => {
      service.createCustomer.and.returnValue(of(customer));

      const completion = fromActions.CreateCustomerSuccess({ create: customer });
      const expected = cold('-b', { b: completion });

      expect(effects.createCustomer$).toBeObservable(expected);
    });
  });

  describe('Update Customer', () => {
    beforeEach(() => {
      const action = fromActions.UpdateCustomer({ update: customer });
      actions$ = hot('-a', { a: action });
    });

    it('should successful when  update customer', () => {
      service.updateCustomer.and.returnValue(of(customer));

      const completion = fromActions.UpdateCustomerSuccess({ update: { id: customer.id, changes: customer } });
      const expected = cold('-b', { b: completion });

      expect(effects.updateCustomer$).toBeObservable(expected);
    });
  });

  describe('Delete Customer', () => {
    beforeEach(() => {
      const action = fromActions.DeleteCustomer({delete: customer});
      actions$ = hot('-a', { a: action });
    });

    it('should successful when delete customer', () => {
      service.deleteCustomer.and.returnValue(of(customer));

      const completion = fromActions.DeleteCustomerSuccess({delete: customer});
      const expected = cold('-b', { b: completion });

      expect(effects.deleteCustomer$).toBeObservable(expected);
    });
  });
});
