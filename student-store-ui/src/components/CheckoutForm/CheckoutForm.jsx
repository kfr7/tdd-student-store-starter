import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm ({ isOpen, shoppingCart, 
                                        checkoutForm, 
                                        handleOnCheckoutFormChange, 
                                        handleOnSubmitCheckoutForm }) {

    return (
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
             
    )
}

