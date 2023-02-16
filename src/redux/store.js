import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './reducers';
import RootSaga from './saga';

let sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

export default configureStore({
  reducer: {
    Reducer: RootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(RootSaga);
