import { Dictionary, EntityState } from '@ngrx/entity';

import { Customer } from '../../shared/customer.model';
import * as fromReducers from '../reducers/customer.reducer';
import * as fromSelectors from '../selectors/customer.selectors';

describe('Customer Selectors', () => {
  const ids = ['1', '2'];

  const customers: Customer[] = [
    {
      id: '1', description: 'Test', avatar: 'Test', name: 'Test', createdAt: 'Test'
    },
    {
      id: '2', description: 'Test', avatar: 'Test', name: 'Test', createdAt: 'Test'
    }
  ];

  const customersDictionary: Dictionary<Customer> = {
    1: customers[0],
    2: customers[1]
  };

  const customerState: fromReducers.CustomerState = {
    ids,
    currentCustomerId: customers[0].id,
    entities: customersDictionary,
    hasLoaded: false,
    error: 'Error'
  };

  it('should get current customer', () => {
    const customerId = fromSelectors.getCurrentCustomer.projector(customerState);
    expect(fromSelectors.getCurrentCustomer.projector(customerState, customerId)).toEqual(customers[0]);
  });

  it('should get customers', () => {
    expect(fromSelectors.selectAllCustomers.projector(customerState)).toEqual(customers);
  });

  it('should get has loaded state', () => {
    expect(fromSelectors.getHasLoaded.projector(customerState)).toEqual(customerState.hasLoaded);
  });
});
