import * as React from "react"
import "./ShoppingCart.css"


export default function ShoppingCart ({ isOpen, products, shoppingCart }) {

    const findAndReturnName = (productId) => {
        let itemName = ""
        products.forEach((product) => {
            if (product.id === productId)
            {
                itemName = product.name
            }
        })
        return itemName
    }

    const findAndReturnUnitPrice = (productId) => {
        let itemPrice = 0
        products.forEach((product) => {
            if (product.id === productId)
            {
                itemPrice = product.price
            }
        })
        return itemPrice
    }

    const calculateSubtotal = () => {
        let subtotal = 0;
        shoppingCart.forEach(itemIdAndQ => {
            subtotal += findAndReturnUnitPrice(itemIdAndQ.itemId) * itemIdAndQ.quantity;
        })
        return subtotal;
    }

    const calculateTaxesAndFees = () => {
        return 0.08 * calculateSubtotal()
    }

    return (
        <div className="shopping-cart">
            <div className={isOpen ? "open" : "closed"}>
                <h3>
                    Shopping Cart
                </h3>
                {shoppingCart.length === 0 ? <p>No items in cart. You didn't find anything you like at all?</p> : null}
                <div className={`CartTable ${shoppingCart.length === 0 ? "closed" : ""}`}>
                    <div className="header">
                        <div className="header-row">
                            <span className="flex-2">Name</span>
                            <span className="center">Quantity</span>
                            <span className="center">Unit Price</span>
                            <span className="center">Cost</span>
                        </div>
                        {shoppingCart.map((itemIdAndQ, idx) => (
                        <div key={idx} className="product-row">
                            <span className="flex-2 cart-product-name">{findAndReturnName(itemIdAndQ.itemId)}</span>
                            <span className="center cart-product-quantity">{itemIdAndQ.quantity}</span>
                            <span className="center cart-product-price">{`$${findAndReturnUnitPrice(itemIdAndQ.itemId).toFixed()}`}</span>
                            <span className="center cart-product-subtotal">{`$${(findAndReturnUnitPrice(itemIdAndQ.itemId) *  itemIdAndQ.quantity).toFixed(2)}`}</span>
                        </div>
                        ))}
                    </div>
                    <div className="receipt">
                        <div className="receipt-subtotal">
                            <span className="label">Subtotal</span>
                            <span></span><span></span>
                            <span className="center subtotal">{`$${calculateSubtotal().toFixed(2)}`}</span>
                        </div>
                        <div className="receipt-taxes">
                            <span className="label">Taxes and Fees</span>
                            <span></span><span></span>
                            <span className="center">{`$${calculateTaxesAndFees().toFixed(2)}`}</span>
                        </div>
                        <div className="receipt-total">
                            <span className="label">Total</span>
                            <span></span><span></span>
                            <span className="center total-price">{`$${(calculateTaxesAndFees() + calculateSubtotal()).toFixed(2)}`}</span>
                        </div>
                    </div>

                </div>
                <div className="checkout-form">
                    <h3>
                        Payment Info
                        <span className="button">
                            <i className="material-icons md-48">monetization_on</i>
                        </span>
                    </h3>
                    <div className="input-field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input name="name"
                            className="checkout-form-input"
                            type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input name="email"
                            className="checkout-form-input"
                            type="email"
                            placeholder="username@domainname.com" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input name="termsAndConditions" type="checkbox" />
                                <span className="label">
                                    "I agree to the 
                                    <a id="termsAndConditions" href="#terms-and-conditions"> terms and conditions</a>
                                    "
                                </span>
                            </label>
                        </div>
                    </div>
                    <p className="is-danger" />
                    <div className="field">
                        <div className="control">
                            <button className="button checkout-button">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}