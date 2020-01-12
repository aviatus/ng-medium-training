import { Customer } from '../../shared/customer.model';
import * as fromActions from '../actions/customer.actions';

describe('Customer Actions', () => {
  const customer: Customer = {
    id: '2',
    name: 'Pizza #2',
    avatar: '',
    createdAt: '',
    description: 'Test'
  };

  describe('Current Customer Actions', () => {
    it('should create Set Current Customer action', () => {
      const payload = customer;
      const action = new fromActions.SetCurrentCustomer(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.SetCurrentCustomer,
        payload
      });
    });

    it('should create Clear Current Customer action', () => {
      const action = new fromActions.ClearCurrentCustomer();

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.ClearCurrentCustomer,
      });
    });
  });

  describe('Load Customer Actions', () => {
    it('should create an Load action', () => {
      const action = new fromActions.Load();

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.Load,
      });
    });

    it('should create an Load Fail action', () => {
      const payload = 'Load Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.LoadFail,
        payload
      });
    });

    it('should create an Load Success action', () => {
      const payload: Customer[] = [customer];
      const action = new fromActions.LoadSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.LoadSuccess,
        payload,
      });
    });
  });

  describe('Create Customer Actions', () => {
    it('should create an Create Customer action', () => {
      const payload: Customer = customer;
      const action = new fromActions.CreateCustomer(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.CreateCustomer,
        payload
      });
    });

    it('should create an Create Customer Fail action', () => {
      const payload = 'Create Error';
      const action = new fromActions.CreateCustomerFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.CreateCustomerFail,
        payload
      });
    });

    it('should create an Create Customer Success action', () => {
      const payload: Customer = customer;
      const action = new fromActions.CreateCustomerSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.CreateCustomerSuccess,
        payload,
      });
    });
  });

  describe('Update Customer Actions', () => {
    it('should create an Update Customer action', () => {
      const payload: Customer = customer;
      const action = new fromActions.UpdateCustomer(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.UpdateCustomer,
        payload,
      });
    });

    it('should create Update Customer Fail action', () => {
      const payload = 'Update Error';
      const action = new fromActions.UpdateCustomerFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.UpdateCustomerFail,
        payload,
      });
    });

    it('should create Update Customer Success action', () => {
      const payload: Customer = customer;

      const action = new fromActions.UpdateCustomerSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.UpdateCustomerSuccess,
        payload,
      });
    });
  });

  describe('Delete Customer Actions', () => {
    it('should create Customer Delete action', () => {
      const payload = customer;
      const action = new fromActions.DeleteCustomer(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.DeleteCustomer,
        payload,
      });
    });

    it('should create Customer Delete Fail action', () => {
      const payload = 'Delete Error';
      const action = new fromActions.DeleteCustomerFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.DeleteCustomerFail,
        payload,
      });
    });

    it('should create Customer Delete Success action', () => {
      const payload = customer;
      const action = new fromActions.DeleteCustomerSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CustomerActionTypes.DeleteCustomerSuccess,
        payload,
      });
    });
  });
});
