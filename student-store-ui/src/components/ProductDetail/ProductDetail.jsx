import * as React from "react"
import "./ProductDetail.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductView from "../ProductView/ProductView"


export default function ProductDetail({handleAddItemToCart, handleRemoveItemToCart, products, shoppingCart, setError, setIsFetching, isFetching}) {
    let {productId} = useParams();
    const [product, setProduct] = React.useState({
		"id": -1,
		"name": "",
		"category": "",
		"image": "",
		"source": "",
		"description": "",
		"price": 0
	})

    React.useEffect(() => {
        // maybe remove line below
        setError("");
        setIsFetching(true);
    
        const fetchData = async () => {
          try {
            const data = await axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
            setProduct(data.data.product);        
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


    const returnQuantityInCart = (productId) => {
        let numberToReturn = 0;
        shoppingCart.forEach(itemInCart => {
          if (itemInCart.itemId === productId)
          {
            numberToReturn = itemInCart.quantity;
          }
        })
        return numberToReturn;
      }

  return (
    <div className="product-detail">
        {isFetching ? <h1 className="loading">Loading...</h1> : null}
        <ProductView product={product} 
        productId={product.id} 
        quantity={returnQuantityInCart(product.id)}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
        />
    </div>
  )
}

