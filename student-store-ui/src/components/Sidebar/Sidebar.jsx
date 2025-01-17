import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import { Link } from "react-router-dom"

export default function Sidebar({ isOpen, shoppingCart,
      products, checkoutForm, handleOnCheckoutFormChange,
      handleOnSubmitCheckoutForm, handleOnToggle, receiptState,
      oldShoppingCart, oldCheckoutForm }) {
  return (
    <section className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="wrapper">
        <button className={`toggle-button ${isOpen ? "" : "rotate"}`} onClick={handleOnToggle}>
          <img id="arrow" src="https://www.pngmart.com/files/3/Left-Arrow-Transparent-PNG.png"/>
        </button>
      </div>
      <ShoppingCart isOpen={isOpen} 
                    products={products} 
                    shoppingCart={shoppingCart} 
                    checkoutForm={checkoutForm}
                    handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                    handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                    receiptState={receiptState}
                    oldCheckoutForm={oldCheckoutForm}
                    oldShoppingCart={oldShoppingCart}/>
      {isOpen ? <Link to="/purchases">
        <button className="previousOrders">See Previous Orders</button>
      </Link> : null}
      
    </section>
  )
}
