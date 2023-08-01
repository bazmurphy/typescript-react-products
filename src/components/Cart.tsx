import { useState } from "react";
import CartLineItem from "./CartLineItem";
import useCart from "../hooks/useCart";
useCart;

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank You for your Order.</h2>
  ) : (
    <>
      <h2 className="">Cart</h2>
      <ul className="cart">
        {cart.length ? (
          cart.map((item) => {
            return (
              <CartLineItem
                key={item.sku}
                item={item}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
              />
            );
          })
        ) : (
          <li className="cart__empty">Your Cart is Empty!</li>
        )}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        {/* if there are no items in the cart the disabled will be set to true */}
        <button
          className="cart__submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Your Order
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};

export default Cart;
