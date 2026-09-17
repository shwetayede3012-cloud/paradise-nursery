import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper to convert "$15" string into number 15
  const parseCost = (cost) => parseFloat(cost.replace('$', ''));

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Checkout is coming soon!');
  };

  const handleContinueShoppingClick = () => {
    if (onContinueShopping) onContinueShopping();
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">Unit Price: {item.cost}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecrement(item)}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h3 className="cart-total-amount">
          Total Cart Amount: ${calculateTotalAmount()}
        </h3>
        <div className="cart-action-buttons">
          <button className="continue-shopping-button" onClick={handleContinueShoppingClick}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
