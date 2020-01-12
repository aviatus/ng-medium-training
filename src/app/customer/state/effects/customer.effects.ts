import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';
import { CustomerService } from '../../shared/services/customer/customer.service';
import * as fromCustomer from '../../state/index';
import * as customerActions from '../actions/customer.actions';
import { getHasLoaded } from '../selectors/customer.selectors';

@Injectable()
export class CustomerEffects {

  constructor(private customerService: CustomerService,
              private actions$: Actions,
              private store: Store<fromCustomer.State>) { }

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.Load),
    withLatestFrom(this.store.pipe(select(getHasLoaded))),
    filter(([action, hasLoaded]) => !hasLoaded),
    switchMap((action) => this.customerService.getCustomers().pipe(
      map(products => (new customerActions.LoadSuccess(products))),
      catchError(err => of(new customerActions.LoadFail(err)))
    )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.UpdateCustomer),
    switchMap((customer: customerActions.UpdateCustomer) =>
      this.customerService.updateCustomer(customer.payload).pipe(
        map(updatedProduct => (new customerActions.UpdateCustomerSuccess(updatedProduct))),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.CreateCustomer),
    switchMap((customer: customerActions.CreateCustomer) =>
      this.customerService.createCustomer(customer.payload).pipe(
        map(newProduct => (new customerActions.CreateCustomerSuccess(newProduct))),
        catchError(err => of(new customerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.DeleteCustomer),
    map((action: customerActions.DeleteCustomer) => action.payload),
    switchMap((customer: Customer) =>
      this.customerService.deleteCustomer(customer.id).pipe(
        map(() => (new customerActions.DeleteCustomerSuccess(customer))),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
