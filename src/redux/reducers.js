import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLogin: false,
  allProducts: [],
  addProductResponse: {},
  productDetails: {},
};

const RootReducer = createSlice({
  name: 'Root',
  initialState,
  reducers: {
    //  Product
    productsRequest(state, action) {
      state.status = action.type;
    },
    productsSuccess(state, action) {
      state.allProducts = action.payload;
      state.status = action.type;
    },
    productsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  productsFailure,
  productsRequest,
  productsSuccess,
} = RootReducer.actions;
export default RootReducer.reducer;
