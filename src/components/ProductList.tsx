import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { UseCartContextType } from "../context/CartProvider";
import { UseProductsContextType } from "../context/ProductsProvider";
import { ReactElement } from "react";
import Product from "./Product";

const ProductList = () => {
  // bring in the various parts from the two custom hooks
  const { dispatch, REDUCER_ACTIONS, cart }: UseCartContextType = useCart();
  const { products }: UseProductsContextType = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;

  return content;
};

export default ProductList;
