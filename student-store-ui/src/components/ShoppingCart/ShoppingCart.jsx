import * as React from "react"
import "./ShoppingCart.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm"

//                                 checkoutForm={checkoutForm}
//                                 handleOnCheckoutFormChange={handleOnCheckoutFormChange}
//                                 handleOnSubmitCheckoutFormChange={handleOnSubmitCheckoutFormChange}
//                                 // 
export default function ShoppingCart ({ isOpen, products, 
                                    shoppingCart,
                                    checkoutForm,
                                    handleOnCheckoutFormChange,
                                    handleOnSubmitCheckoutFormChange }) {

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
        return 0.0875 * calculateSubtotal()
    }

    return (
        <div className="shopping-cart">
            <div className={isOpen ? "open" : "closed"}>
                <h3>
                    Shopping Cart
                </h3>
                {shoppingCart.length === 0 ? <p className="notification">No items added to cart yet. Start shopping now!</p> : null}
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
                <CheckoutForm   isOpen={isOpen}
                                shoppingCart={shoppingCart}
                                checkoutForm={checkoutForm}
                                handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                                handleOnSubmitCheckoutFormChange={handleOnSubmitCheckoutFormChange}
                                />
            </div>
        </div>
    )
}