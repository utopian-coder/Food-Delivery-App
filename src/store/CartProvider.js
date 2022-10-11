import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultState = { items: [], totalAmount: 0 };
const cartStateReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingCartItem) {
      console.log("reducer ran");
      console.log(action.item.amount);
      console.log(existingCartItem);
      const currTotalAmount = existingCartItem.amount + action.item.amount;
      console.log(currTotalAmount);
      const updatedItem = {
        ...existingCartItem,
        amount: currTotalAmount,
      };
      console.log(updatedItem);
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    let updatedItems;

    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== existingCartItem.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
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
