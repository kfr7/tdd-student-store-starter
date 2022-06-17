import * as React from "react"
import "./Sidebar.css"

export default function Sidebar({ isOpen, shoppingCart,
      products, checkoutForm, handleOnCheckoutFormChange,
      handleOnSubmitCheckoutForm, handleOnToggle }) {
  return (
    <section className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="wrapper">
        <button className={`toggle-button ${isOpen ? "" : "rotate"}`} onClick={handleOnToggle}>
          <img id="arrow" src="https://www.pngmart.com/files/3/Left-Arrow-Transparent-PNG.png"/>
        </button>
      </div>
    </section>
  )
}
