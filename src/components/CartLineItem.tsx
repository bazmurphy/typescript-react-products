import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "../context/CartProvider";
import { ChangeEvent, ReactElement } from "react";

type CartLineItemPropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: CartLineItemPropsType) => {
  // using the new URL object
  const image: string = new URL(`../images/${item.sku}.webp`, import.meta.url)
    .href;

  const lineTotal: number = item.qty * item.price;

  const highestQuantity: number = 10 > item.qty ? 10 : item.qty;

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    );
  });

  const onChangeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(event.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });
  };

  const content = (
    <li className="cart__item">
      <img src={image} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(item.price)}
      </div>

      <label className="offscreen" htmlFor="itemQuantity" hidden>
        Item Quantity
      </label>
      <select
        name="itemQuantity"
        id="itemQuantity"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQuantity}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        onClick={onRemoveFromCart}
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
      >
        X
      </button>
    </li>
  );

  return content;
};

export default CartLineItem;
