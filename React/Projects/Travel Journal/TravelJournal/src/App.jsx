import React from "react"
import Navbar from './Navbar'
import data from './data'
import Travel from './Travel'


export default function App() {
    const travels = data.map(item => {
      return ( 
        <Travel

            item={item}
        />    
      )
    })

  return (
    <div>
        <Navbar />
        <section className="travels-list">
                {travels}
            </section>
    </div>
  )
}


