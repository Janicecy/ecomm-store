import { formatCurrency } from "../../utils";
import './CartItem.scss'

export default function CartItem({
  product,
  quantity,
  onQuantityChange,
  onDeleteItem,
}) {
  const { image, title, price } = product;
  return (
    <tr className="cart-item">
      <td className="cart-item__info table__cell--left">
        <div className="cart-item__info-wrapper">
          <img alt={title} className="cart-item__image" src={image} />

          <div className="cart-item__meta">
            <span style={{ marginBottom: 5 }} className="cart-item__title">
              {title}
            </span>
            <span className="cart-item__price">${price}</span>
          </div>
        </div>
      </td>

      <td className="cart-item__quantity">
        <div className="cart-item__quantity-selector">
          <button
            data-testid="quantity-selector__minus"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            &minus;
          </button>
          <span data-testid="quantity-selector__value">{quantity}</span>
          <button
            data-testid="quantity-selector__plus"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            &#x2b;
          </button>
        </div>
        <button data-testid='cart-item__delete-btn' className="cursor-pointer" onClick={onDeleteItem}>
          Delete
        </button>
      </td>
      <td className="cart-item__total table__cell--right">
        {formatCurrency(quantity * price)}
      </td>
    </tr>
  );
}
