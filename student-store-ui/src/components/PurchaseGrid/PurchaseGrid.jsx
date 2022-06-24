import * as React from "react"
import "./PurchaseGrid.css"
import PurchaseCard from "../PurchaseCard/PurchaseCard"
import axios from "axios"

export default function PurchaseGrid( { purchases, products } ) {

    const [emailSearchValue, setEmailSearchValue] = React.useState("")
    const handleOnInputChange = (event) => {
        setEmailSearchValue(event.target.value)
    }

    const filteredPurchases = purchases.filter((purchase) => {
        try{
            console.log(purchase.email)
            if (purchase.email.toLowerCase().match(emailSearchValue) !== null)
            {
              return true
            }
            else 
            {
              return false
            }
          }
          catch{
            return false
          }
    })

    return (
        <>
        <div className="search-bar">
            <input type="text" name="email-search" placeholder="Search by email" onChange={handleOnInputChange} />
                <i className="material-icons">search</i>
        </div>
            <div id="PastPurchases" className="purchase-grid">
                <div className="content">
                    <h3>Previous Purchases</h3>
                    <div className="grid">
                    { filteredPurchases.length === 0 ? <div className="card"><p>Sorry! Nothing matched your search.</p></div> : 
                    filteredPurchases.map((purchase, idx) => (
                        <PurchaseCard 
                        key={idx}
                        purchase={purchase}
                        enlarged={false}
                        products={products}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}
