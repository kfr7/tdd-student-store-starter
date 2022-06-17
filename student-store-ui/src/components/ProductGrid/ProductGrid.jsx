import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid({products, handleAddItemToCart, handleRemoveItemToCart, shoppingCart}) {

  const returnQuantityInCart = (productId) => {
    let numberToReturn = 0;
    shoppingCart.forEach(itemInCart => {
      if (itemInCart.itemId === productId)
      {
        numberToReturn = itemInCart.quantity;
      }
    })
    return numberToReturn;
  }

  return (
    <div id="Buy" className="product-grid">
      <div className="content">
        <h3>Best Selling Products</h3>
        <div className="grid">
          {/* HERE IS WHERE I MAP OVER products and MAKE product-card */}
          { products.length === 0 ? <div className="card"><p>Sorry! Nothing matched your search.</p></div> : 
          products.map((product, idx) => (
            <ProductCard 
            key={idx}
            product={product}
            productId={product.id}
            // CHANGE quantity to shoppingCart object quantity
            quantity={returnQuantityInCart(product.id)}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
            showDescription={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

