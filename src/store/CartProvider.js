import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultState = { items: [], totalAmount: 0 };
const cartStateReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
  }
};

const CartProvider = (props) => {
  const [cartState, dispathCartState] = useReducer(
    cartStateReducer,
    defaultState
  );

  const addItemHandler = (item) => {
    dispathCartState({ type: "ADD", item });
  };

  const removeItemHandler = (id) => {
    dispathCartState({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
