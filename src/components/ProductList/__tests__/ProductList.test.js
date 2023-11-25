import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import ProductList from '../ProductList';
import { Provider } from 'react-redux'
import store from '../../../store';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';


test('Add a product to cart', async () => {
  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );

  await waitFor(() => {
    const button = screen.getAllByText('ADD TO CART')[0];
    button.click()
  })
  expect(
    screen.getByText(/1 in cart/)
  ).toBeInTheDocument()
});


test('Remove a product from cart', async () => {
  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );

  await waitFor(() => {
    const button = screen.getAllByText('ADD TO CART')[0];
    button.click()
  })
  await userEvent.click(screen.getByText(/Remove/))
  expect(screen.queryByText(/Remove/)).not.toBeInTheDocument()
});
