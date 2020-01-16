import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';
import { CustomerService } from '../../shared/services/customer/customer.service';
import * as fromCustomer from '../../state/index';
import * as customerActions from '../actions/customer.actions';

// import { getHasLoaded } from '../selectors/customer.selectors';

@Injectable()
export class CustomerEffects {

  constructor(private customerService: CustomerService,
              private actions$: Actions,
              private store: Store<fromCustomer.CustomerState>) { }

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.Load),
    withLatestFrom(this.store.pipe(select(fromCustomer.getHasLoaded))),
    filter(([action, hasLoaded]) => !hasLoaded),
    switchMap((action) => this.customerService.getCustomers().pipe(
      map(customers => customerActions.LoadSuccess({ customers }))
    )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.UpdateCustomer),
    switchMap((state) =>
      this.customerService.updateCustomer(state.update).pipe(
        map(updatedProduct => (customerActions.UpdateCustomerSuccess({ update: { id: updatedProduct.id, changes: updatedProduct } }))),
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CreateCustomer),
    switchMap((state) =>
      this.customerService.createCustomer(state.create).pipe(
        map((customer: Customer) => (customerActions.CreateCustomerSuccess({ create: customer }))),
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.DeleteCustomer),
    switchMap((state) =>
      this.customerService.deleteCustomer(state.delete.id).pipe(
        map((customer: Customer) => customerActions.DeleteCustomerSuccess({ delete: customer }))
      )
    ));
}
