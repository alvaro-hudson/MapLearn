import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import view components
import Learn from "./Learn"
import Play from "./Play"
// import components

import Header from "./Header"
import Footer from "./Footer"
import Music from "./Music"

function App() {
  return (
    <Router>
      <Music />
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Learn />} />
          <Route path="/play" element={<Play />} />

          {/* <Route path='/play' element={<Play />} />   This will be for our stretch */}
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
