import * as React from "react"
import "./ProductDetail.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductView from "../ProductView/ProductView"
import NotFound from "../NotFound/NotFound"

export default function ProductDetail({handleAddItemToCart, 
            handleRemoveItemToCart, 
            products, shoppingCart, 
            setError, setIsFetching, 
            isFetching}) {
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

  const withinProducts = (prodId) => {
    const newList = products.filter((product) => {
      return product.id === prodId;
    })
    if (newList.length === 0)
    {
      return <NotFound />
    }
    else
    {
      return <ProductView product={product} 
      productId={product.id} 
      quantity={returnQuantityInCart(product.id)}
      handleAddItemToCart={handleAddItemToCart}
      handleRemoveItemToCart={handleRemoveItemToCart}
      />
    }
  }  

    React.useEffect(() => {
        // maybe remove line below
        setError("");
        setIsFetching(true);
    
        const fetchData = async () => {
          try {
            // const data = await axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
            const data = await axios.get(`http://localhost:3001/store/${productId}`)
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
        {isFetching ? <h1 className="loading">Loading...</h1> : withinProducts(product.id)}
    </div>
  )
}

