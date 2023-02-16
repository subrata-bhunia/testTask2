import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_DETAILS,
  UPDATE_PRODUCT,
} from './actionsType';

export const productDetails = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.data];
    case DELETE_PRODUCT:
      return;
    case UPDATE_PRODUCT:
      return;
    case PRODUCT_DETAILS:
      return;
    default:
      return state;
  }
};
