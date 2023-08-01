import { createContext, ReactElement, useState } from "react";
// if we want to switch to live data(1)
// import { useEffect } from "react";

// define a type to mirror the data from products.json
export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// we can use that to define the initial state
const initialState: ProductType[] = [
  {
    sku: "item0001",
    name: "Bao Buns",
    price: 1.99,
  },
  {
    sku: "item0002",
    name: "Dragon Fruit Lollies",
    price: 2.49,
  },
  {
    sku: "item0003",
    name: "Gyoza Dumplings",
    price: 2.99,
  },
  {
    sku: "item0004",
    name: "Kombucha Green Tea",
    price: 1.79,
  },
  {
    sku: "item0005",
    name: "Mango & Coconut Sorbet",
    price: 1.99,
  },
  {
    sku: "item0006",
    name: "Mini Duck Spring Rolls",
    price: 2.25,
  },
  {
    sku: "item0007",
    name: "Frozen Stir Fry Vegetables",
    price: 2.29,
  },
  {
    sku: "item0008",
    name: "Sweet Chilli Sauce",
    price: 1.29,
  },
];

// if we wanted to switch to live data(2):
// const initialState: ProductType[] = [];

// define a type for the initial Context State
export type UseProductsContextType = { products: ProductType[] };

// we can use that to define the initial Context State
const initialContextState: UseProductsContextType = { products: [] };

// create the Products Context (using the type defined above) and set its initial state
const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

// create a children type, because we need to provide the children type when we create a context (in React 18+)(before that it was implicit)
type ChildrenType = { children?: ReactElement | ReactElement[] };

// the children
// it is not the same as a Prop that is being passed down and used
// it is something that you put in a Component between the opening and closing JSX tags
// although it is a prop, it is just not provided in the same way

// we create the Provider, it takes in children, and it returns a ReactElement
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // eslint-disable-next-line
  const [products, setProducts] = useState<ProductType[]>(initialState);

  // if we wanted to switch to live data(3)
  // useEffect(() => {
  //   // Promise Chain [A]
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch("http://localhost:3000/products")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .catch((error) => {
  //         if (error instanceof Error) {
  //           console.log(error.message);
  //         }
  //       });
  //     return data;
  //   };
  //   fetchProducts().then((products) => setProducts(products));
  //   // Try Catch [B]
  //   const fetchProducts = async (): Promise<void> => {
  //     try {
  //       const response = await fetch("http://localhost:4000/products");
  //       const data: ProductType[] = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // we wrap the children in the Provider and we set the value to the "products" state from above
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
