import * as React from "react"
import "./Logo.css"

export default function Logo() {
  return (
    <div className="logo">
        <a href="/">
            {/* THE CODE PATH LOGO IS NOT SHOWING UP */}
            <img src="https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg" alt="codepath logo"/>
            {/* <img src="/assets/codepath.f1b3e41a.svg" alt="codepath logo"/> */}
        </a>
    </div>

  )
}