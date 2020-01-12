import { Customer } from '../../shared/customer.model';
import { CustomerActions, CustomerActionTypes } from '../actions/customer.actions';

export interface CustomerState {
  currentCustomerId: string | null;
  customers: Customer[];
  hasLoaded: boolean;
  error: string;
}

export const initialState: CustomerState = {
  currentCustomerId: null,
  customers: [],
  hasLoaded: false,
  error: ''
};

export function reducer(state = initialState, action: CustomerActions): CustomerState {
  switch (action.type) {
    case CustomerActionTypes.LoadSuccess:
      return {
        ...state,
        customers: action.payload,
        hasLoaded: true,
        error: ''
      };

    case CustomerActionTypes.LoadFail:
      return {
        ...state,
        customers: [],
        hasLoaded: false,
        error: action.payload
      };

    case CustomerActionTypes.UpdateCustomerSuccess:
      const updatedCustomers = state.customers.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        customers: updatedCustomers,
        currentCustomerId: action.payload.id,
        error: ''
      };

    case CustomerActionTypes.UpdateCustomerFail:
      return {
        ...state,
        error: action.payload
      };

    case CustomerActionTypes.CreateCustomerSuccess:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        currentCustomerId: action.payload.id,
        error: ''
      };

    case CustomerActionTypes.CreateCustomerFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentCustomer is null.
    case CustomerActionTypes.DeleteCustomerSuccess:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload.id),
        currentCustomerId: null,
        error: ''
      };

    case CustomerActionTypes.DeleteCustomerFail:
      return {
        ...state,
        error: action.payload
      };

    case CustomerActionTypes.SetCurrentCustomer:
      return {
        ...state,
        currentCustomerId: action.payload.id
      };

    case CustomerActionTypes.ClearCurrentCustomer:
      return {
        ...state,
        currentCustomerId: null
      };

    default:
      return state;
  }
}
