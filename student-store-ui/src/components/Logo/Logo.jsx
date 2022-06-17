import * as React from "react"
import "./Logo.css"
import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <div className="logo">
      <Link to={{pathname: "/"}}>
        <img id="mainLogo" src={"https://www.pngmart.com/files/1/Shopping-Bag-Icon-PNG.png"} alt="codepath logo"/>
      </Link>

    </div>

  )
}

