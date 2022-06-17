import * as React from "react"
import "./ProductCard.css"
import { Link } from "react-router-dom"

export default function ProductCard({ product, productId, 
  quantity, handleAddItemToCart, handleRemoveItemToCart, showDescription }) {
  // maybe make a state that is initialized with showDescription
  // or maybe just use props.showDescription to toggle the html or not

  return (
    <div className={`product-card ${showDescription ? "enlarged" : "normal"}`}>
        <div className="media">
          {/* INSIDE OF HERE I HAVE TO USE A Link Tag and To prop that goes to /products/productId */}
          <Link to={{pathname: `/products/${productId}`}}>
            <img src={`${product.image}`} alt="product cover" loading="lazy" />
          </Link>
        </div>
        <div className="product-info">
          <div className="main-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.price}</p>
          </div>

          {showDescription ? 
          <div className="desc">
            <p className="product-description">
              {product.description}
            </p>
          </div> : null}

          <div className="actions">
            <div className="buttons">
                <button className="remove" onClick={() => handleRemoveItemToCart(product.id)}>
                  <i className="material-icons">remove</i>
                </button>
                <button className="add" onClick={() => handleAddItemToCart(product.id)}>
                  <i className="material-icons">add</i>
                </button>
            </div>

            {quantity > 0 ? 
            <span className="quantity">
              <span className="amt">{quantity}</span>
            </span>
            : null}
          </div>
        </div>
    </div>
  )
}