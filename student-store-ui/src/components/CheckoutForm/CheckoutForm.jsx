import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm ({ isOpen, shoppingCart, 
                                        checkoutForm, 
                                        handleOnCheckoutFormChange, 
                                        handleOnSubmitCheckoutForm,
                                        findAndReturnName,
                                        findAndReturnUnitPrice,
                                        calculateSubtotal,
                                        calculateTaxesAndFees,
                                        receiptState,
                                        oldShoppingCart, oldCheckoutForm }) {
    

    const displayMessage = () => {
        if (receiptState === "success")
        {   

            return (<><p className="success">Success!</p>
            <div className="card">
                <header className="card-head">
                    <h4 className="card-title">Receipt</h4>
                </header>
                <section className="card-body">
                    <p className="header">{`Showing receipt for 
                    ${oldCheckoutForm.name} available at ${oldCheckoutForm.email}:`}</p>
                    <ul className="purchase">
                        {oldShoppingCart.map((itemBought, idx) => (
                        <li key={idx}>
                            {`${itemBought.quantity} total ${findAndReturnName(itemBought.itemId)} purchased
                                at a cost of $${findAndReturnUnitPrice(itemBought.itemId).toFixed(2)}
                                for a total cost of $${(findAndReturnUnitPrice(itemBought.itemId) *  itemBought.quantity).toFixed(2)}.`}
                        </li>
                        ))}
                        <li>
                            {`Before taxes, the subtotal was $${calculateSubtotal(oldShoppingCart).toFixed(2)}`}
                        </li>
                        <li>
                            {`After taxes and fees were applied, the total comes out to $${(calculateTaxesAndFees(oldShoppingCart) + calculateSubtotal(oldShoppingCart)).toFixed(2)}`}
                        </li>
                    </ul>
                </section>
            </div>
            </>)
        }
        else if (receiptState === "error1") // shopping cart is empty
        {
            return (<><p className="error">Shopping cart is empty. Please add items to cart.</p></>)
        }
        else if (receiptState === "error2") // Name and/or email is not filled out 
        {
            return (<><p className="error">Name and/or email is not filled out.</p></>)
        }
        else // default page
        {
            return (<div className="content">
                <p>
                    A confirmation email will be sent to you so that you can confirm
                    this order. Once you have confirmed the order, it will
                    be delivered to your dorm room.
                </p>
            </div>)
        }
    }
                                        
    return (<>
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
                    type="text" placeholder="Student Name"
                    onChange={handleOnCheckoutFormChange }
                    />
                </div>
            </div>
            <div className="input-field">
                <label className="label">Email</label>
                <div className="control">
                    <input name="email"
                    className="checkout-form-input"
                    type="email"
                    placeholder="student@codepath.org"
                    onChange={handleOnCheckoutFormChange} />
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
                    <button onClick={handleOnSubmitCheckoutForm}
                            className="button checkout-button">
                                Checkout
                    </button>
                </div>
            </div>
            {/* NEED TO PUT TAG FOR ERROR className="error" */}
            {/* also need to do success */}
        </div>
        <div className="checkout-success">
            <h3>
                "Checkout Info"
                <span className="icon button">
                    <i className="material-icons md-48">fact_check</i>
                </span>
            </h3>
            {displayMessage()}
        </div>
        </>   
    )
}

