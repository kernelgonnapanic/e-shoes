export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  CLEAR_CART = "CLEAR_CART",
  DELETE_ITEM = "DELETE_ITEM",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  SET_SHIPPING = "SET_SHIPPING",
}

export const addToCart = (
  _id: string,
  size: number,
  price: number,
  name: string,
  imgSrc: string,
  quantity: number = 1,
) => {
  return {
    type: CartActionTypes.ADD_TO_CART as const,
    payload: { _id: _id + size, size, price, name, imgSrc, quantity },
  };
};

export const clearCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART as const,
  };
};

export const deleteItem = (_id: string) => {
  return {
    type: CartActionTypes.DELETE_ITEM as const,
    payload: { _id },
  };
};

export const increaseQuantity = (_id: string) => ({
  type: CartActionTypes.INCREASE_QUANTITY as const,
  payload: { _id },
});

export const decreaseQuantity = (_id: string) => ({
  type: CartActionTypes.DECREASE_QUANTITY as const,
  payload: { _id },
});

export const setShippingValue = (shippingValue: string) => ({
  type: CartActionTypes.SET_SHIPPING as const,
  payload: { shippingValue },
});


export type CartActions = 
  | ReturnType<typeof addToCart> 
  | ReturnType<typeof clearCart> 
  | ReturnType<typeof deleteItem> 
  | ReturnType<typeof increaseQuantity>
  | ReturnType<typeof decreaseQuantity>
  | ReturnType<typeof setShippingValue>;

