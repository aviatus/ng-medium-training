import * as fromRoot from '../../state/app.state';
import * as fromProducts from './reducers/customer.reducer';

export * from './reducers/customer.reducer';
export * from './actions/customer.actions';
export * from './effects/customer.effects';
export * from './selectors/customer.selectors';

export interface State extends fromRoot.State {
  customer: fromProducts.CustomerState;
}
