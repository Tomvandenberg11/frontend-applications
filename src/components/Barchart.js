import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import numFormatter from "../hooks/useNumFormatter"
import Checkbox from "./CustomCheckbox"

const Barchart = ({ data }) => {
  const ref = useRef() // For targeting the SVG
  const [filteredData, setFilteredData] = useState() // A hook the data which is being used
  const [globalVars, setGlobalVars] = useState({}) // Hook with empty object for global vars

  useEffect(() => {
    // Setting up margins and heights for the SVG
    const margin = { top: 40, bottom: 10, left: 120, right: 20 }
    const width = 1000 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom

    // Creating SVG element in body
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    // Use the group element in the SVG with margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Bar color setup
    const barcolor = d3.scaleSequential().interpolator(d3.interpolateBlues)

    // Scales setup
    const xscale = d3.scaleLinear().range([0, width])
    const yscale = d3.scaleBand().rangeRound([0, height])

    // Axis setup
    const xaxis = d3.axisTop().scale(xscale).tickSizeOuter([0])
    const g_xaxis = g.append("g").attr("class", "x axis")
    const yaxis = d3.axisLeft().scale(yscale).tickSizeOuter([0])
    const g_yaxis = g.append("g").attr("class", "y axis")

    // Putting global vars in global hook to use in next useEffect
    setGlobalVars({
      xscale,
      yscale,
      g_xaxis,
      g_yaxis,
      xaxis,
      yaxis,
      barcolor,
      svg,
    })
  }, [])

  // Changing content of filteredData hook when data changes
  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    // Check if there is data available
    if (!filteredData) {
      return
    }

    // Reusing global vars if data updates
    const { xscale, yscale, g_xaxis, g_yaxis, xaxis, yaxis, barcolor, svg } =
      globalVars

    xscale.domain([0, d3.max(filteredData, (d) => d.population * 1000)]) // Making x scale based on population
    yscale // Making y scale based on countries
      .domain(filteredData.map((d) => d.country))
      .paddingInner(0.1)
      .paddingOuter(0.05)
    barcolor.domain([0, d3.max(filteredData, (d) => d.population * 1000)]) // Setting up bar colors based on population

    // Giving
    g_xaxis.transition().call(xaxis)
    g_yaxis.transition().call(yaxis)

    svg
      .select("g")
      .selectAll("rect")
      .data(filteredData, (d) => d.country)
      .join("rect")
      .transition()
      .attr("height", yscale.bandwidth())
      .attr("width", (d) => xscale(d.population * 1000))
      .attr("y", (d) => yscale(d.country))
      .attr("fill", (d, i) => barcolor(d.population * 1000))

    svg
      .selectAll("rect")
      .append("title")
      .attr("x", 100)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text((d) => numFormatter(d.population * 1000))
  })

  const [underBillion, setUnderBillion] = useState(false)

  const checkboxChange = () => {
    if (!underBillion) {
      setUnderBillion(true)
      setFilteredData(data.filter((d) => d.population < 1000000))
    } else {
      setFilteredData(data)
      setUnderBillion(false)
    }
  }

  return (
    <>
      <Checkbox
        label="Only countries under 1 billion inhabitants"
        value={underBillion}
        onChange={checkboxChange}
      />
      <svg ref={ref}></svg>
    </>
  )
}

export default Barchart
