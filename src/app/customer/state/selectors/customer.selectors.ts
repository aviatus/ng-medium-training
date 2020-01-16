import { createFeatureSelector, createSelector, State } from '@ngrx/store';

import { CustomerState } from '../';
import { selectAll } from '../reducers/customer.reducer';

export const getCustomerFeatureState = createFeatureSelector<CustomerState>('customers');

export const selectAllCustomers = createSelector(
  getCustomerFeatureState,
  selectAll
);

export const getHasLoaded = createSelector(
  getCustomerFeatureState,
  state => state.hasLoaded
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  state => state.entities[state.currentCustomerId]
);
