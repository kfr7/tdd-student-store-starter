import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid({products, handleAddItemToCart, handleRemoveItemToCart}) {
  return (
    <div id="Buy" className="product-grid">
        <ProductCard />

        {/* {products.map((product, idx) => (
            // also need to pass through, 
            // key={idx}
            // productId={idx}
            // quantity={0}
            // handleAddItemToCart={handleAddItemToCart}
            // handleRemoveItemToCart={handleRemoveItemToCart}
            // showDescription={false}
            <ProductCard />
        ))} */}
    </div>
  )
}

