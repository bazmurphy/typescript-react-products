import useCart from "../hooks/useCart";

type FooterPropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: FooterPropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <>
      <div></div>
      <p>VITASIA &copy; {year}</p>
    </>
  ) : (
    <>
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
      </div>
      <p>VITASIA &copy; {year}</p>
    </>
  );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
};

export default Footer;
