import Nav from "./Nav";
import useCart from "../hooks/useCart";

type HeaderPropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: HeaderPropsType) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header">
      <div className="header__subcontainer-one">
        <img src="./logo.png" alt="Logo" className="header__logo" />
        <h1 className="header__title">VITASIA</h1>
      </div>
      <div className="header__subcontainer-two">
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </div>
    </header>
  );

  return content;
};

export default Header;
