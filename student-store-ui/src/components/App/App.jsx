import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
// Things I added below
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

export default function App() {
  // create all variable states needed



  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Routes>

            <Route path="/" element={<><Navbar/><Sidebar/><Home /></>}/>

            

            <Route path="/products/:productid" element={<><Navbar/><Sidebar/></>}/>
              {/* should render ProductDetail component here as well (above) */}


            <Route path="*" element={<><Navbar/><Sidebar/></>}/>
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
