import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  removeFromCart,
  updateProductQuantity,
} from "../../store/cart/cartSlice";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return cart.cartItems.length === 0 ? (
    // Display this view when cart is empty
    <div className="cart-wrapper">
      <h1 className="cart__header">Your Cart is empty</h1>
      <Link to='/'>
        <button
          style={{ display: "block", margin: "0 auto" }}
          className="btn--primary"
        >
          Shop our products
        </button>
      </Link>
    </div>
  ) : (
    <div className="cart-wrapper">
      <h1 className="cart__header">My Cart</h1>
      <table className="cart-items-table">
        <thead>
          <tr style={{ fontSize: '1.2em' }}>
            <th className="table__cell--left">Product</th>
            <th>Quantity</th>
            <th className="table__cell--right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map(({ product, quantity }) => {
            return (
              <CartItem
                key={product.id}
                onQuantityChange={(newQuantity) => {
                  dispatch(
                    newQuantity === 0
                      ? removeFromCart({ productId: product.id })
                      : updateProductQuantity({
                          productId: product.id,
                          quantity: newQuantity,
                        })
                  );
                }}
                product={product}
                quantity={quantity}
                onDeleteItem={() =>
                  dispatch(removeFromCart({ productId: product.id }))
                }
              />
            );
          })}
        </tbody>
      </table>
      <div className="cart__subtotal">
        <span className="">Subtotal: </span>
        {formatCurrency(cart.subtotal)}
      </div>
    </div>
  );
}
