import { CustomerState } from '../customer/state/customer.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  customer: CustomerState;
}
