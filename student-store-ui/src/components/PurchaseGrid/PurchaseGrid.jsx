import * as React from "react"
import "./PurchaseGrid.css"
import PurchaseCard from "../PurchaseCard/PurchaseCard"
import axios from "axios"

export default function PurchaseGrid( { purchases, products } ) {

    return (
        <div id="PastPurchases" className="purchase-grid">
        <div className="content">
            <h3>Previous Purchases</h3>
            <div className="grid">
            { purchases.length === 0 ? <div className="card"><p>Sorry! Nothing matched your search.</p></div> : 
            purchases.map((purchase, idx) => (
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
    )
}
