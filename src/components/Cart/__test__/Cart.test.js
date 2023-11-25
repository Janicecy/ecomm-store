import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import Cart from '../Cart';
import cartReducer, { addToCart } from '../../../store/cart/cartSlice';
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const productA = {
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}

test('Update product quantity', async () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    },
  })

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    </Provider>
  );

  // add test product to cart by calling dispatch function 
  act(() => store.dispatch(addToCart(productA)))
  // click + button to update quantity 
  act(() => screen.getByTestId('quantity-selector__plus').click())
  // quantity should be updated and display 2 
  expect(screen.getByTestId('quantity-selector__value')).toHaveTextContent('2')
});

test('Remove product from cart by clicking delete button', async () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    },
  })
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    </Provider>
  );
  // add test product to cart by calling dispatch function 
  act(() => store.dispatch(addToCart(productA)))
  // click - button to update quantity 
  act(() => screen.getByTestId('cart-item__delete-btn').click())
  expect(screen.queryByText(productA.title)).not.toBeInTheDocument()
});