import * as React from "react"
import "./PurchaseDetail.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import PurchaseView from "../PurchaseView/PurchaseView"
import NotFound from "../NotFound/NotFound"

export default function PurchaseDetail({    purchases, setError, setIsFetching, 
                                            isFetching, error, products   }) {
    let {purchaseId} = useParams();
    const [purchase, setPurchase] = React.useState({
		"id": -1,
		"name": "",
		"category": "",
		"image": "",
		"source": "",
		"description": "",
		"price": 0
	})

  const withinPurchases = (prodId) => {
    const newList = purchases.filter((purchase) => {
      return purchase.id === prodId;
    })
    if (newList.length === 0)
    {
      return <NotFound />
    }
    else
    {
      return <PurchaseView purchase={purchase}  products={products}
      />
    }
  }  

    React.useEffect(() => {
        // maybe remove line below
        setError("");
        setIsFetching(true);
    
        const fetchData = async () => {
          try {
            // const data = await axios.get(`https://codepath-store-api.herokuapp.com/store/${purchaseId}`)
            const data = await axios.get(`http://localhost:3001/store/purchases/${purchaseId}`)
            setPurchase(data.data.purchase);        
          }
          catch (error)
          {
            console.error(error.message);
            setError("Error Encountered");
          }
          setIsFetching(false);
        }
    
        fetchData();
      }, []);

  return (

    <div className="purchase-detail">
        {isFetching ? <h1 className="loading">Loading...</h1> : withinPurchases(purchase.id)}
    </div>
  )
}

