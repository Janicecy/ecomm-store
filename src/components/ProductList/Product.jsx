import { useEffect, useRef } from "react";
import { formatCurrency } from "../../utils";
import './Product.scss'

const MAX_WORDS_VISIBLE = 25;

export default function Product({
  title,
  price,
  description,
  image,
  onAddToCart,
}) {
  const descriptionRef = useRef(null);

  useEffect(() => {
    // programmatically add '...Read More' button to description if
    // the number of words exceed the max_words_visible milit
    const $descWrapper = descriptionRef.current;
    const $desc = $descWrapper.querySelector(".product__description");

    const words = description.split(" ");
    if (words.length > MAX_WORDS_VISIBLE) {
      $desc.innerText = words.slice(0, MAX_WORDS_VISIBLE).join(" ");

      // create '...Read More' button and add style and event listener
      const button = document.createElement("button");
      button.classList.add("read-more-btn");
      button.innerText = "...Read More";
      // when button is clicked, display full description and hide button.
      button.addEventListener("click", () => {
        button.style.display = "none";
        $desc.innerText = description;
      });
      $desc.appendChild(button);
    }
  }, [descriptionRef, description]);

  return (
    <div className="product">
      <div className="product__img-wrapper">
        <img className="product__img" alt={title} src={image} />
      </div>
      <div className="product__info">
        <div className="product__title">{title}</div>
        <div className="product__price">
          <span>{formatCurrency(price)}</span>
        </div>
      </div>
      <div ref={descriptionRef} className="product__description-wrapper">
        <span
          style={{ display: "inline-block" }}
          className="product__description"
        >
          {description.split(" ").slice(0, 25).join(" ")}
        </span>
      </div>
      <button className="product__add-to-cart-btn" onClick={onAddToCart}>
        ADD TO CART
      </button>
    </div>
  );
}
