import { useReducer, useMemo, createContext, ReactElement } from "react";

// define a cart item type
export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

// define a cart state type (an array of cart item types)
type CartStateType = {
  cart: CartItemType[];
};

// create the initial cart state
const initialCartState: CartStateType = { cart: [] };

// define a set of reducer action types (as strings - not enums this time)
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

// define the type for Reducer Action Types
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

// define a Reducer Actions
export type ReducerAction = {
  // the action type
  type: string;
  // the payload type
  payload?: CartItemType;
};

// create our reducer function
// it takes in a state and an action
// it returns a CartState (an array of Cart Items)
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  // the reducer uses a switch case statement for the action.type
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      // type guard in case the action.payload is undefined/empty
      if (!action.payload) {
        throw new Error("action.payload missing in the ADD action");
      }

      // destructure the information from the payload
      const { sku, name, price } = action.payload;

      // filter the cart for all the items we are NOT updating
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // define what types itemExists
      // determine if the item is in the cart already
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      // if it exists add 1 to it, if it doesn't exist set it to 1
      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      // spread the state in, then update the cart array, to spread in all of the unadjusted products, and then added product with new qty value
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in the REMOVE action");
      }

      const { sku } = action.payload;

      // filter the cart for all items we are not removing
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in the QUANTITY action");
      }

      const { sku, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      // type guard
      if (!itemExists) {
        throw new Error("the Item must exist in order to update the quantity");
      }

      // spread in the itemExists properties, and add in the quantity property/value
      const updatedItem: CartItemType = { ...itemExists, qty };

      // filter the cart for all items we are not updating
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // spread the state in, then update the cart array, to spread in all of the unadjusted products, and then add in the updatedItem
      return {
        ...state,
        cart: [...filteredCart, updatedItem],
      };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified Reducer Action Type");
  }
};

// create a Use Cart Context
const useCartContext = (initialCartState: CartStateType) => {
  // pass in the reducer and the initialCartState to the useReducer
  const [state, dispatch] = useReducer(reducer, initialCartState);

  // define reducer actions as a Memoised
  // so that is always has the SAME REFERENTIAL EQUALITY (so the object is not being recreated with a new reference in memory over and over)
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // inferred type number
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  // we create and format the total price to a string with a currency symbol
  const totalPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // put the cart in order
  const cart = state.cart.sort((a, b) => {
    // extract the last 4 digits of the item number
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  // to finish the hook we return everything we have defined
  // dispatch keeps its referential equality (it will not cause a re-render)
  // the REDUCER_ACTION is memoised
  // but the totalItems, totalPrice, cart are not... (could cause re-renders?)
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

// create the Cart Context Type and use the "ReturnType" utility type and "typeof" to give us the correctly defined Types (mouseover useCartContext)
export type UseCartContextType = ReturnType<typeof useCartContext>;

// setup initial state to pass into the Cart Context
const initialCartContextState: UseCartContextType = {
  // and initialiser function
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

// create the Cart Context with "createContext" and use the type defined directly above, then pass it the initial Cart Context State
export const CartContext = createContext<UseCartContextType>(
  initialCartContextState
);

// define the Children Type
type ChildrenType = { children?: ReactElement | ReactElement[] };

// create the Cart Context Provider
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    // use the useCartContext custom hook we defined above and pass it the initialCartState
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
