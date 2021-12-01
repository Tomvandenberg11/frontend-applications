import React from "react"
import Barchart from "../src/components/Barchart"
import { topPopulation } from "./data"

const App = () => {
  return (
    <div>
      <Barchart width={600} height={400} data={topPopulation} />
    </div>
  )
}

export default App
