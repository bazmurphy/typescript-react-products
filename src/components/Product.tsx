import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo } from "react";

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

// ForPerformance Optimisation we can memoize the Functional Component

// the Product will always be a new object that is created, so it will never have Referential Equality
// "dispatch" already has Referential Equality
// REDUCER_ACTIONS we Memoised with useMemo
// but the "product" object and the inCart boolean are the problem...
// therefore we need to create a function to compare them
const areProductsEqual = (
  { product: prevProduct, inCart: prevInCart }: ProductPropsType,
  { product: nextProduct, inCart: nextInCart }: ProductPropsType
) => {
  return (
    Object.keys(prevProduct).every((key) => {
      // compare every key
      // return prevProduct[key] === nextProduct[key]
      // but TypeScript doesn't like that^ so we need to use an Assertion :
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && // and compare the boolean
    prevInCart === nextInCart
  );
};

// memo accepts the CartLineItem as the first argument, and the comparison function "areProductsEqual" as the second argument
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

// now when we add a product to the cart only that one will re-render, and the others will not re-render
export default MemoizedProduct;
