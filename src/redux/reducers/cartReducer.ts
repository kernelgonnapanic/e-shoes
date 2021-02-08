import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { CartActions, CartActionTypes } from "../actions/cartActions";
import { getFromLocalStorage } from "./reducerHelpers";

const initialState = {
  itemCount: 0,
  total: 0,
  cartItems: [],
  shipping: 0,
};

export type Initial = {
  itemCount: number;
  total: number;
  cartItems: ItemsListProps[];
};

const initialFromLocalStorage = getFromLocalStorage<Initial>(
  "e_Shoes-cart",
  initialState,
);

export const cart = (
  state: Initial = initialFromLocalStorage,
  action: CartActions,
) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { payload } = action;
      const ifCartAlreadyContains =
        state.cartItems.filter((item) => item._id === payload._id).length > 0;
      if (ifCartAlreadyContains) return state;

      const newTotal = state.total + payload.price;
      const newTotalFixed = Number(newTotal.toFixed(2));

      return {
        cartItems: [...state.cartItems, { ...payload }],
        itemCount: state.itemCount + 1,
        total: newTotalFixed,
      };
    }
    case CartActionTypes.CLEAR_CART:
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };
    case CartActionTypes.DELETE_ITEM: {
      const { payload } = action;

      const [itemToDelete] = state.cartItems.filter(
        (item) => item._id === payload._id,
      );

      if (!itemToDelete.quantity) return;
      const calculatedTotal =
        state.total - itemToDelete.price * itemToDelete.quantity;
      const fixedCalculatedTotal = Number(calculatedTotal.toFixed(2));
      return {
        itemCount: state.itemCount - itemToDelete.quantity,
        total: fixedCalculatedTotal,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== payload._id),
        ],
      };
    }
    case CartActionTypes.INCREASE_QUANTITY: {
      const { payload } = action;

      const [itemToIncrease] = state.cartItems.filter(
        (item) => item._id === payload._id,
      );
      if (!itemToIncrease) return;
      const itemToIncreaseCopy = { ...itemToIncrease };
      if (itemToIncreaseCopy.quantity) {
        itemToIncreaseCopy.quantity = itemToIncreaseCopy.quantity + 1;
      }

      const increasedTotal = state.total + itemToIncrease.price;
      const fixedIncreasedTotal = Number(increasedTotal.toFixed(2));
      return {
        itemCount: state.itemCount + 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== payload._id),
          itemToIncreaseCopy,
        ],
        total: fixedIncreasedTotal,
      };
    }
    case CartActionTypes.DECREASE_QUANTITY: {

      const { payload } = action;
      const { _id } = payload;

      const [itemToDecrease] = state.cartItems.filter(
        (item) => item._id === _id,
      );
      const decreasedTotal = state.total - itemToDecrease.price;

      const itemToDecreaseCopy = { ...itemToDecrease };

      if (itemToDecreaseCopy.quantity === 1) return state;
      const fixedDecreasedTotal = Number(decreasedTotal.toFixed(2));
      itemToDecreaseCopy.quantity =
        itemToDecreaseCopy.quantity && itemToDecreaseCopy.quantity - 1;

      return {
        itemCount: state.itemCount - 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== payload._id),
          itemToDecreaseCopy,
        ],
        total: fixedDecreasedTotal,
      };
    }
    case CartActionTypes.SET_SHIPPING: {
      const {payload} = action;
      return {
        ...state,
        shipping: parseFloat(payload.shippingValue.replace(",", ".")),
      };
    }
    default:
      break;
  }
  return state;
};
