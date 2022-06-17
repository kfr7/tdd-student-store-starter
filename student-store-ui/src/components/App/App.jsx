import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductDetail from "../ProductDetail/ProductDetail"
import "./App.css"
// Things I added below
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import axios from "axios"


export default function App() {
  // create all variable states needed
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState("");
  // whether side bar is open or not
  const [isOpen, setIsOpen] = React.useState(false);
  // each object in shopping cart should have two fields: itemId, quantity
  const [shoppingCart, setShoppingCart] = React.useState([]);
  // look up what we need to send to the POST message
  const [checkoutForm, setCheckoutForm] = React.useState();

  const [categorySelected, setCategorySelected] = React.useState("All Categories")
  const [searchFieldValue, setSearchFieldValue] = React.useState("")
  // SOMETHING LIKE THIS TO ONLY SHOW MATCHING SEARCH
  const currentMerchandiseFromSearch = products.filter((product) => {
    try{
      if (product.name.toLowerCase().match(searchFieldValue) !== null && 
        (categorySelected === "All Categories" || categorySelected.toLowerCase() === product.category))
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

  React.useEffect(() => {
    // maybe remove line below
    setError("");
    setIsFetching(true);

    const fetchData = async () => {
      try {
        const data = await axios.get("https://codepath-store-api.herokuapp.com/store")
        setProducts(data.data.products);        
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

  // haven't tested correctness of below function 
  const handleOnToggle = () => {
    // toggle isOpen
    if (isOpen)
    {
      setIsOpen(false);
    }
    else
    {
      setIsOpen(true);
    }
  }

  // doesn't "add the price of the product to the total price of the shoppingCart" like in write up
  const handleAddItemToCart = (productId) => {
    let newObj = {itemId: productId, quantity: 1}
    let newArray = shoppingCart.filter(el => {
      if(el.itemId === newObj.itemId)
      {
        newObj.quantity = el.quantity + 1
        return false
      }
      else 
      {
        return true
      }
    })
    newArray.push(newObj)
    setShoppingCart(newArray);
    console.log("After adding", newArray)
  }
  
  // haven't tested correctness of below function 
  const handleRemoveItemFromCart = (productId) => {
    // will be set with decremented value of current in shopping cart
    // if not found, then this remains 0 and we simply don't add anything
    let newObj = {itemId: productId, quantity: 0} 
    let newArray = shoppingCart.filter(el => {  
      if(el.itemId === newObj.itemId)
      {
        newObj.quantity = el.quantity - 1
        return false
      }
      else 
      {
        return true
      }
    })
    if (newObj.quantity > 0)
    {
      newArray.push(newObj)
    }
    setShoppingCart(newArray);
    console.log("After removing", newArray)
  }

  // check what POST is supposed to have as params before confirming if right or not
  const handleOnCheckoutFormChange = (name, value) => {
    let newObject = {name: name, value: value}
    setCheckoutForm(newObject);
  }

  // test alongside with above function
  const handleOnSubmitCheckoutForm = () => {
    axios.post("https://codepath-store-api.herokuapp.com/store",
    {user: {name: checkoutForm.name, email: checkoutForm.value}, shoppingCart: shoppingCart})
    .then((response) => {
      console.log(response);
    }, reason => {
      setError(reason);
      console.error(reason);
    })
    // axios.post("https://codepath-store-api.herokuapp.com/store",
    // checkoutForm)
    // .then((response) => {
    //   console.log(response);
    // }, reason => {
    //   setError(reason);
    //   console.error(reason);
    // })
    
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar/>
          <Sidebar isOpen={isOpen} shoppingCart={shoppingCart}
                    products={products}
                    checkoutForm={checkoutForm}
                    handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                    handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                    handleOnToggle={handleOnToggle}/>
          <Routes>
            

            <Route path="/" element={<Home  products={currentMerchandiseFromSearch} 
                                            handleAddItemToCart={handleAddItemToCart} 
                                            handleRemoveItemToCart={handleRemoveItemFromCart}
                                            shoppingCart={shoppingCart}
                                            setSearchFieldValue={setSearchFieldValue}
                                            categorySelected={categorySelected}
                                            setCategorySelected={setCategorySelected} />}/>

            

            <Route path="/products/:productId" element={<ProductDetail 
                                                          handleAddItemToCart={handleAddItemToCart}
                                                          handleRemoveItemToCart={handleRemoveItemFromCart}
                                                          products={products}
                                                          shoppingCart={shoppingCart}
                                                          setError={setError}
                                                          setIsFetching={setIsFetching}
                                                          isFetching={isFetching}
                                                          />}/>
              {/* should render ProductDetail component here as well (above) */}


            <Route path="*" element={<></>}/>
              {/* should render NotFound component */}
            
          </Routes>
          
          
        </main>
      </BrowserRouter>
    </div>
  )
}

// DEFAULT TEMPLATE BELOW
// export default function App() {
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <main>
//           {/* YOUR CODE HERE! */}
//           <Navbar />
//           <Sidebar />
//           <Home />
//         </main>
//       </BrowserRouter>
//     </div>
//   )
// }
