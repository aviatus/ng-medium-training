import { Customer } from '../../shared/customer.model';
import * as fromActions from '../actions/customer.actions';
import * as fromReducer from './customer.reducer';

describe('Customer Reducer', () => {
  const { initialState } = fromReducer;

  it('should return the default state', () => {
    const action = {} as any;
    const state = fromReducer.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should load success customers', () => {
    const customers: Customer[] = [
      { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
      { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
    ];
    const action = new fromActions.LoadSuccess(customers);
    const state = fromReducer.reducer(initialState, action);

    expect(state.customers).toEqual(customers);
    expect(state.hasLoaded).toEqual(true);
    expect(state.error).toEqual('');
  });

  it('should load fail customers', () => {
    const error = 'Load Fail Error';
    const action = new fromActions.LoadFail(error);
    const state = fromReducer.reducer(initialState, action);

    expect(state.error).toEqual(error);
    expect(state.hasLoaded).toEqual(false);
    expect(state.customers).toEqual([]);
  });

  it('should successful when create customer', () => {
    const customerList: Customer[] = [
      { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
      { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
    ];
    const newCustomer: Customer = {
      id: 'Test3', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = new fromActions.CreateCustomerSuccess(newCustomer);
    const state = fromReducer.reducer({ ...initialState, customers: customerList }, action);

    expect(state.customers).toEqual([...customerList, newCustomer]);
    expect(state.currentCustomerId).toEqual(newCustomer.id);
    expect(state.error).toEqual('');
  });

  it('should fail when create customers', () => {
    const error = 'Create Fail Error';
    const action = new fromActions.CreateCustomerFail(error);
    const state = fromReducer.reducer(initialState, action);

    expect(state.error).toEqual(error);
  });

  it('should successful when update customers', () => {
    const customerList: Customer[] = [
      { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
      { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
    ];
    const updatedCustomer: Customer = {
      id: 'Test2', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = new fromActions.UpdateCustomerSuccess(updatedCustomer);
    const state = fromReducer.reducer({ ...initialState, customers: customerList }, action);

    expect(state.customers.find((customer) => customer.id === updatedCustomer.id)).toEqual(updatedCustomer);
    expect(state.currentCustomerId).toEqual(updatedCustomer.id);
    expect(state.error).toEqual('');
  });

  it('should fail when update customers', () => {
    const error = 'Update Fail Error';
    const action = new fromActions.CreateCustomerFail(error);
    const state = fromReducer.reducer(initialState, action);

    expect(state.error).toEqual(error);
  });

  it('should successful when delete customer', () => {
    const customerList: Customer[] = [
      { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
      { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
    ];
    const action = new fromActions.DeleteCustomerSuccess(customerList[0]);
    const state = fromReducer.reducer({ ...initialState, customers: customerList }, action);

    expect(state.customers.length).toEqual(customerList.length - 1);
    expect(state.currentCustomerId).toBeNull();
    expect(state.error).toEqual('');
  });

  it('should fail when delete customers', () => {
    const error = 'Delete Fail Error';
    const action = new fromActions.DeleteCustomerFail(error);
    const state = fromReducer.reducer(initialState, action);

    expect(state.error).toEqual(error);
  });

  it('should set current customer', () => {
    const customer: Customer = {
      id: 'Test3', name: 'Test3', description: 'Test3', avatar: 'Test3', createdAt: 'Test3'
    };
    const action = new fromActions.SetCurrentCustomer(customer);
    const state = fromReducer.reducer(initialState, action);

    expect(state.currentCustomerId).toEqual(customer.id);
  });

  it('should clear current customer', () => {
    const action = new fromActions.ClearCurrentCustomer();
    const state = fromReducer.reducer(initialState, action);

    expect(state.currentCustomerId).toBeNull();
  });
});
