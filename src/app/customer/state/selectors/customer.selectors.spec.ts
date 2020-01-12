import { Customer } from '../../shared/customer.model';
import * as fromReducers from '../reducers/customer.reducer';
import * as fromSelectors from '../selectors/customer.selectors';

describe('Customer Selectors', () => {
  const customer: Customer = {
    id: '1', description: 'Test', avatar: 'Test', name: 'Test', createdAt: 'Test'
  };

  const customers: Customer[] = [
    {
      id: '1', description: 'Test', avatar: 'Test', name: 'Test', createdAt: 'Test'
    },
    {
      id: '2', description: 'Test', avatar: 'Test', name: 'Test', createdAt: 'Test'
    }
  ];

  const customerState: fromReducers.CustomerState = {
    currentCustomerId: customer.id,
    customers: customers,
    hasLoaded: false,
    error: 'Error'
  };

  it('should get current customer id', () => {
    expect(fromSelectors.getCurrentCustomerId.projector(customerState)).toEqual(customer.id);
  });

  it('should get current customer', () => {
    const customerId = fromSelectors.getCurrentCustomerId.projector(customerState);
    expect(fromSelectors.getCurrentCustomer.projector(customerState, customerId)).toEqual(customer);
  });

  it('should get customers', () => {
    expect(fromSelectors.getCustomers.projector(customerState)).toEqual(customers);
  });

  it('should get error', () => {
    expect(fromSelectors.getError.projector(customerState)).toEqual(customerState.error);
  });

  it('should get has loaded state', () => {
    expect(fromSelectors.getHasLoaded.projector(customerState)).toEqual(customerState.hasLoaded);
  });
});
