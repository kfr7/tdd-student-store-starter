import * as React from "react"
import "./ProductView.css"
import ProductCard from "../ProductCard/ProductCard"
import NotFound from "../NotFound/NotFound"
import { Link } from "react-router-dom"

export default function ProductView({ product, productId, quantity, handleAddItemToCart, handleRemoveItemToCart }) {
  // maybe make a state that is initialized with showDescription
  // or maybe just use props.showDescription to toggle the html or not

  return (
    <div className="product-view">
        <h1 className="product-id">
            Product #{productId}
        </h1>
        <div className="product-view-card" >
            <ProductCard product={product} productId={productId} quantity={quantity}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
            showDescription={true} />
        </div>
    </div>
  )
}