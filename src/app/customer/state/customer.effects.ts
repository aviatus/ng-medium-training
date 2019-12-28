import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/services/customer/customer.service';
import * as customerActions from './customer.actions';

@Injectable()
export class CustomerEffects {

  constructor(private customerService: CustomerService,
    private actions$: Actions) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.Load),
    mergeMap(action =>
      this.customerService.getCustomers().pipe(
        map(products => (new customerActions.LoadSuccess(products))),
        catchError(err => of(new customerActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.UpdateCustomer),
    map((action: customerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(updatedProduct => (new customerActions.UpdateCustomerSuccess(updatedProduct))),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.CreateCustomer),
    map((action: customerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(newProduct => (new customerActions.CreateCustomerSuccess(newProduct))),
        catchError(err => of(new customerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.DeleteCustomer),
    map((action: customerActions.DeleteCustomer) => action.payload),
    mergeMap((customerId: string) =>
      this.customerService.deleteCustomer(customerId).pipe(
        map(() => (new customerActions.DeleteCustomerSuccess(customerId))),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
