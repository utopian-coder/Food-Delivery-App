import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul>
      {[{ id: "c1", price: 12, amount: 2, name: "sushi" }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>124</span>
      </div>
      <div className={classes.actions}>
        <button className={classes.button}>Order</button>
        <button className={classes["button--alt"]}>Close</button>
      </div>
    </Modal>
  );
};

export default Cart;
