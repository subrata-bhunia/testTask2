import {legacy_createStore} from 'redux';
import {productDetails} from './reducers';

export const store = legacy_createStore(productDetails);
