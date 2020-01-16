import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';

export const Load = createAction('[Customer] Load');
export const LoadSuccess = createAction('[Customer] Load Success', props<{ customers: Customer[] }>());
export const CreateCustomer = createAction('[Customer] Create Customer', props<{ create: Customer }>());
export const CreateCustomerSuccess = createAction('[Customer] Create Customer Success', props<{ create: Customer }>());
export const UpdateCustomer = createAction('[Customer] Update Customer', props<{ update: Customer }>());
export const UpdateCustomerSuccess = createAction('[Customer] Update Customer Success', props<{ update: Update<Customer> }>());
export const DeleteCustomer = createAction('[Customer] Delete Customer', props<{ delete: Customer }>());
export const DeleteCustomerSuccess = createAction('[Customer] Delete Customer Success', props<{ delete: Customer }>());
export const SetCurrentCustomer = createAction('[Customer] Set Current Customer', props<{ customer: Customer }>());
export const ClearCurrentCustomer = createAction('[Customer] Clear Current Customer');
