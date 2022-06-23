import * as React from "react"
import "./ProductCardPurchased.css"
import { Link } from "react-router-dom"
// use above later for maybe linking to the item

export default function ProductCardPurchased({ orderIdAndQ, products, enlarged }) {

    const findSpecificProduct = (productId) => {
        let productFound = null;
        products.forEach((product) => {
            if (productId === product.id)
            {
                productFound = product
            }
        })
        return productFound
    }
    const displaySpecific = () => {
        if (enlarged)
        {
            try{
                return  <div className="item-purchased">
                        Ordered {orderIdAndQ.quantity} {findSpecificProduct(orderIdAndQ.itemId).name}(s) 
                        @ ${findSpecificProduct(orderIdAndQ.itemId).price}
                        </div>
            }
            catch(error)
            {
                return null
            }
            
        }
    }
    return (
        <>{displaySpecific()}</>
        
    )
}