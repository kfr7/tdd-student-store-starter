import * as React from "react"
import "./PurchaseView.css"
import PurchaseCard from "../PurchaseCard/PurchaseCard"


export default function PurchaseView({ purchase, products }) {
  // maybe make a state that is initialized with showDescription
  // or maybe just use props.showDescription to toggle the html or not

  return (
    <div className="purchase-view">
        <div className="purchase-view-card" >
            <PurchaseCard purchase={purchase} enlarged={true} products={products}/>
        </div>
    </div>
  )
}