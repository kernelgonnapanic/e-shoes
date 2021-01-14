import { ActionTypes, DispatchProp } from "../actions/shoesActions";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

const initialState = {
  shoes: [],
  loading: false,
  next: {},
  previous: null,
  errors: null,
};

export type ShoesInitial = {
  shoes: ItemsListProps[];
  loading: boolean;
  next: object;
  previous: object | null;
  errors: object | null;
};

export const shoes = (
  state: ShoesInitial = initialState,
  action: DispatchProp,
) => {
  const { type, payload } = action;

  switch (type) {
    //

    case ActionTypes.GET_ITEMS_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.GET_ITEMS_SUCCES:
      return {
        shoes: [...state.shoes, ...payload.shoes],
        loading: false,
        next: payload.next,
        previous: payload.previous,
        left: payload.left,
      };

    case ActionTypes.GET_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.err,
      };

    default:
      break;
  }
  return state;
};
