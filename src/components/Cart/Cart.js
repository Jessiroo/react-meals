import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import OrderForm from './OrderForm';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  const { isLoading, error, sendRequest: sendOrderInformation } = useHttp();


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;


  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };


  const showOrderFormHandler = () => {
    setShowOrderForm(true);
  }

  const cancelOrderFormHandler = (event) => {
    event.preventDefault();
    setShowOrderForm(false);
  }


  const finalizeOrderHandler = async (customerData) => {
    sendOrderInformation(
      {
        url: 'https://react-http-cff85-default-rtdb.firebaseio.com/orders.json',
        method: 'POST',
        body: {
          customer: customerData,
          order: cartCtx.items,
          totalPrice: cartCtx.totalAmount,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setOrderConfirmation(true);

    if (error) {
      return;
    }

    console.log('Order Placed!', `Your total was $${cartCtx.totalAmount}.`, cartCtx.items);
    console.log(customerData);

    cartCtx.clearCart();
    setShowOrderForm(false);
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!showOrderForm && cartItems}
      {!orderConfirmation && <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>}
      <div className={classes.total}>
        {isLoading && <span>Processing...</span>}
        {orderConfirmation && <span>Your order has been processed!</span>}
      </div>
      <div>
        <OrderForm 
          showOrderForm={showOrderForm}
          onCancel={cancelOrderFormHandler}
          onPlaceOrder={finalizeOrderHandler}
        />
      </div>
      <div className={classes.actions}>
        {!showOrderForm && <button 
          className={classes['button--alt']} 
          onClick={props.onClose}
        >Close</button>}
        {hasItems && !showOrderForm && <button 
          className={classes.button} 
          onClick={showOrderFormHandler}
        >Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
