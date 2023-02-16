import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from './actionsType';

export const addProduct = data => ({
  type: ADD_PRODUCT,
  data,
});

export const updateProduct = (id, data) => ({
  type: UPDATE_PRODUCT,
  id,
  data,
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  id,
});
