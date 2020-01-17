import { Dictionary } from '@ngrx/entity';

import { Customer } from '../../shared/customer.model';
import * as fromActions from '../actions/customer.actions';
import * as fromReducer from './customer.reducer';

describe('Customer Reducer', () => {
  const { initialState } = fromReducer;
  let customerList: Dictionary<Customer>;
  beforeEach(() => {
    customerList = {
      Test1: { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
      Test2: { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
    };
  });

  it('should return the default state', () => {
    const action = {} as any;
    const state = fromReducer.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should load success customers', () => {
    const action = fromActions.LoadSuccess({ customers: [customerList.Test1, customerList.Test2] });
    const state = fromReducer.reducer(initialState, action);

    expect(state.entities).toEqual(customerList);
    expect(state.hasLoaded).toEqual(true);
    expect(state.error).toEqual('');
  });

  it('should successful when create customer', () => {
    const newCustomer: Customer = {
      id: 'Test3', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = fromActions.CreateCustomerSuccess({ create: newCustomer });
    const state = fromReducer.reducer({ ...initialState, entities: customerList }, action);

    expect(state.entities).toEqual({ ...customerList, Test3: newCustomer });
    expect(state.error).toEqual('');
  });

  it('should successful when update customers', () => {
    const updatedCustomer: Customer = {
      id: 'Test2', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = fromActions.UpdateCustomerSuccess({ update: { id: updatedCustomer.id, changes: updatedCustomer } });
    const state = fromReducer.reducer({ ...initialState, entities: customerList }, action);

    expect(state.entities[updatedCustomer.id]).toEqual(updatedCustomer);
    expect(state.error).toEqual('');
  });

  it('should successful when delete customer', () => {
    const action = fromActions.DeleteCustomerSuccess({ delete: customerList.Test1 });
    const state = fromReducer.reducer({ ...initialState, entities: customerList }, action);

    expect(Object.keys(state.entities).length).toBe(Object.keys(customerList).length - 1);
    expect(state.error).toEqual('');
  });

  it('should set current customer', () => {
    const customer: Customer = {
      id: 'Test3', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = fromActions.SetCurrentCustomer({ customer });
    const state = fromReducer.reducer(initialState, action);

    expect(state.currentCustomerId).toEqual(customer.id);
  });

  it('should clear current customer', () => {
    const action = fromActions.ClearCurrentCustomer();
    const state = fromReducer.reducer(initialState, action);

    expect(state.currentCustomerId).toBeNull();
  });
});
