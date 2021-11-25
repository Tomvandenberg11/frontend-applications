import React, { useEffect, useState } from 'react'
import Barchart from '../src/components/Barchart'

const dataArray = [
  { country: "China", population: "1415046", continent: "Asia" },
  { country: "India", population: "1354052", continent: "Asia" },
  { country: "United States", population: "326767", continent: "North America" },
]


let i = 0

const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    changeData()
  }, [])

  const changeData = () => {
    setData(dataArray[i++]);
    if(i === dataArray.length) i = 0
  }

  return (
    <div>
      <button onClick={changeData}>Change Data</button>
      <Barchart width={600} height={400} data={data} />
    </div>
  )
}

export default App;