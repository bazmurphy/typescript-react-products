import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement } from "react";

type ProductPropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: ProductPropsType): ReactElement => {
  // the older way to do it with CRA, it will not work way with Vite
  // const img: string = require("../images/${product.sku}.webp");

  // using the new URL object
  const image: string = new URL(
    `../images/${product.sku}.webp`,
    import.meta.url
  ).href;

  const onAddToCart = () => {
    // send a dispatch, with the type "ADD" and the payload of the product and the qty (although its not neccessary and could be an optional property)
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
  };

  // display if the item is in the cart
  const itemInCart = inCart ? "Item In Cart: ✔️" : null; // "Item In Cart ✖️";

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img className="product__img" src={image} alt={product.name} />
      <p>
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(product.price)}{" "}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add To Cart</button>
    </article>
  );

  return content;
};

export default Product;
