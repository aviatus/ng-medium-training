import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { Customer } from '../shared/customer.model';
import * as fromProducts from './customer.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  customer: fromProducts.CustomerState;
}

// Selector functions
const getCustomerFeatureState = createFeatureSelector<fromProducts.CustomerState>('customers');

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  state => state.currentCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  (state, currentCustomerId) => {
    if (currentCustomerId) {
      return currentCustomerId ? state.customers.find(p => p.id === currentCustomerId) : null;    } else {
    }
    return;
  }
);

export const getCustomer = createSelector(
  getCustomerFeatureState,
  state => state.customers
);

export const getError = createSelector(
  getCustomerFeatureState,
  state => state.error
);
