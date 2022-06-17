import * as React from "react"
import "./SubNavbar.css"


export default function SubNavbar({products, handleAddItemToCart, handleRemoveItemToCart, setSearchFieldValue, categorySelected, setCategorySelected}) {

    const handleOnSearchBarChange = (event) => {
        console.log(event.target.value)
        setSearchFieldValue(event.target.value)
    }

    const [showAllCategories, setShowAllCategories] = React.useState(true)

    const handleThreeLineClick = () => {
        console.log("entering three line")
        if (showAllCategories)
        {
            setShowAllCategories(false)
        }
        else 
        {
            setShowAllCategories(true)
        }
    }


  return (
    <nav className="sub-navbar">
        <div className="content">
            <div className="row">
                <div className="search-bar">
                    <input type="text" name="search" placeholder="Search" onChange={handleOnSearchBarChange}/>
                    <i className="material-icons">search</i>
                </div>
                <div className="links">
                    <span className="help">
                        <i className="material-icons">help</i>
                        "Help"
                    </span>
                    <div className="cart">
                        <a href="/">
                            "My Cart"
                            <i className="material-icons">shopping_cart</i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="hamburger-menu">
                    <i className="material-icons"  onClick={handleThreeLineClick}>menu</i>
                </div>
                <ul className={`category-menu ${showAllCategories ? "open" : "closed"}`}>
                    <li className={categorySelected === "All Categories" ? "is-active" : ""}>
                        <button onClick={() => setCategorySelected("All Categories")}>All Categories</button>
                    </li>
                    <li className={categorySelected === "Clothing" ? "is-active" : ""}>
                        <button onClick={() => setCategorySelected("Clothing")}>Clothing</button>
                    </li>
                    <li className={categorySelected === "Food" ? "is-active" : ""}>
                        <button onClick={() => setCategorySelected("Food")}>Food</button>
                    </li>
                    <li className={categorySelected === "Accessories" ? "is-active" : ""}>
                        <button onClick={() => setCategorySelected("Accessories")}>Accessories</button>
                    </li>
                    <li className={categorySelected === "Tech" ? "is-active" : ""}>
                        <button onClick={() => setCategorySelected("Tech")}>Tech</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

