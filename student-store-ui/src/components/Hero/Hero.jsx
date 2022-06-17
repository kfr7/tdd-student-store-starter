import * as React from "react"
import "./Hero.css"

export default function Hero({products, handleAddItemToCart, handleRemoveItemToCart}) {
  return (
    <div className="hero">
        <div className="content">
            <div className="intro">
                <h1>Welcome!</h1>
                <h1>Find what you like, easily.</h1>
                <p>
                    Look for things you like to start filling up your shopping cart. Checkout whenever you're ready.
                </p>
            </div>
            <div className="media">
                <img className="hero-img" src="https://www.pngmart.com/files/7/Buy-PNG-Photos.png" alt="hero" />
            </div>
        </div>
    </div>
  )
}
