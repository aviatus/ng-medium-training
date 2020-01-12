import { CustomerState } from '../customer/state/reducers/customer.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  customer: CustomerState;
}
