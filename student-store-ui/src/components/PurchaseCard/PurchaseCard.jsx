import * as React from "react"
import "./PurchaseCard.css"
import ProductCardPurchased from "../ProductCardPurchased/ProductCardPurchased"
import { Link } from "react-router-dom"
// use above later

export default function ProductCard({ purchase, enlarged, products }) {
  // maybe make a state that is initialized with showDescription
  // or maybe just use props.showDescription to toggle the html or not

  return (
    // COME BACK LATER TO LINK TO SPECIFICS PURCHASE CARD
    <>
    <Link to={`/purchases/${purchase.id}`}>
      <div className={`purchase-card ${enlarged ? "enlarged" : "normal"}`}>
          <div className="purchase-info">
            <div className="main-info">
              <p className="purchase-title">Purchase Details</p>
              <p className="purchase-id">ID #{purchase.id}</p>
              <p className="purchase-name">Name: {purchase.name}</p>
              <p className="purchase-email">Email: {purchase.email}</p>
              {!enlarged ? <p className="purchase-bag-amount">Different Items Bought: {purchase.order.length}</p> : null}
              <p className="purchase-total">Total Cost with Taxes+Fees: ${purchase.total}</p>
              <p className="purchase-createdAt">When: {purchase.createdAt}</p>
              {purchase.order.map((orderIdAndQ, idx) => (
        // think I will need to pass down products to do this
        <ProductCardPurchased key={idx} 
                              orderIdAndQ={orderIdAndQ} 
                              enlarged={enlarged} 
                              products={products}
                              />
      )
      )}
      {enlarged ? <p id="footer">Taxes and Fees not shown in itemized purchase details.</p> : null}
            </div>
          </div>
      </div>
    </Link>
    
    </>
  )
}