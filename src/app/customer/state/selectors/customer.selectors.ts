import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProducts from '../reducers/customer.reducer';

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
      return currentCustomerId ? state.customers.find(p => p.id === currentCustomerId) : null;
    }
    return;
  }
);

export const getCustomers = createSelector(
  getCustomerFeatureState,
  state => state.customers
);

export const getError = createSelector(
  getCustomerFeatureState,
  state => state.error
);

export const getHasLoaded = createSelector(
  getCustomerFeatureState,
  state => state.hasLoaded
);
