import { Action } from 'rxjs/internal/scheduler/Action';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on, State } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';
import * as CustomerActions from '../actions/customer.actions';

export interface CustomerState extends EntityState<Customer> {
  currentCustomerId: string | null;
  hasLoaded: boolean;
  error: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
  currentCustomerId: null,
  hasLoaded: false,
  error: ''
});

export const reducer = createReducer(initialState,
  on(CustomerActions.LoadSuccess, (state, action) => adapter.addAll(action.customers, { ...state, hasLoaded: true })),
  on(CustomerActions.DeleteCustomerSuccess, (state, action) => adapter.removeOne(action.delete.id, state)),
  on(CustomerActions.CreateCustomerSuccess, (state, action) => adapter.addOne(action.create, state)),
  on(CustomerActions.UpdateCustomerSuccess, (state, action) => adapter.updateOne(action.update, state)),
  on(CustomerActions.SetCurrentCustomer, (state, action) => {
    return { ...state, currentCustomerId: action.customer.id };
  }),
  on(CustomerActions.ClearCurrentCustomer, (state, action) => {
    return { ...state, currentCustomerId: null };
  }));

export const {
  selectAll,
} = adapter.getSelectors();
