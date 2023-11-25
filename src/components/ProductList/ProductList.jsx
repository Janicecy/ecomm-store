import Product from "./Product";
import "./ProductList.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateProductQuantity,
} from "../../store/cart/cartSlice";
import { useState, useEffect, useRef } from "react";
import Spin from "../../assets/icons/Spin";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";

const INIT_PAGE_SIZE = 20;
const TOTAL_SIZE = 100;
const PAGE_SIZE = 8;

export default function ProductList() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const hasMoreProductsRef = useRef(true);

  // fetch products on page load
  useEffect(() => {
    fetchProducts({ limit: INIT_PAGE_SIZE });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.9;
      if (isAtBottom) {
        fetchProducts({ limit: PAGE_SIZE });
      }
    };
    const debouncedHandleScroll = debounce(handleScroll, 300);
    window.addEventListener("scroll", debouncedHandleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  async function fetchProducts({ limit = PAGE_SIZE, page }) {
    if (loading || !hasMoreProductsRef.current) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://fakestoreapi.com/products?limit=${limit}`
      );
      // use callback to avoid stale state
      setProducts((prods) => {
        const newProducts = prods.concat(
          data.map((prod) => ({ ...prod, id: uuidv4() }))
        );
        // if no more products to be fetched, set the flag to false
        if (newProducts.length >= TOTAL_SIZE) {
          hasMoreProductsRef.current = false;
        }
        return newProducts;
      });
    } catch (e) {
      console.log('Something went wrong when fetching product data...');
      // Display error message to screen 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="product-list-wrapper">
      <h1 className="product-list__header">All Products</h1>
      <div className="product-list__listings">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.product.id === product.id
          );
          const isAlreadyInCart = cartItem !== undefined;
          return (
            <div key={product.id} className="product-wrapper">
              <Product
                key={product.id}
                {...product}
                onAddToCart={() => {
                  dispatch(
                    isAlreadyInCart
                      ? updateProductQuantity({
                          productId: product.id,
                          quantity: cartItem.quantity + 1,
                        })
                      : addToCart(product)
                  );
                }}
              />
              {/* Display the number of items in cart  */}
              {isAlreadyInCart && (
                <div>
                  <span className="font-bold">
                    {cartItem.quantity + " in cart "}
                  </span>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart({ productId: product.id }));
                    }}
                  >
                    - Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {loading && <Spin />}
    </div>
  );
}
