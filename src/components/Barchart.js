import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { scaleLinear, scaleBand } from "d3-scale"
import numFormatter from "../hooks/useNumFormatter"
import Checkbox from "./CustomCheckbox"

const Barchart = ({ data }) => {
  const ref = useRef()
  const [isAsia, setIsAsia] = useState(false)

  const margin = { top: 40, bottom: 10, left: 120, right: 20 }
  const width = 1000 - margin.left - margin.right
  const height = 600 - margin.top - margin.bottom

  const filteredAsia = data.filter((d) => d.continent === "Asia")

  const makeSVG = () => {
    d3.select("#barchart").remove()

    // Creating SVG element in body
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("id", "barchart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    // Use the group element for margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales setup
    const xscale = scaleLinear().range([0, width]) // scaleLinear for lineair data
    const yscale = scaleBand().rangeRound([0, height]).paddingInner(0.1) // scaleband for ordinal data, the countries

    // Axis setup
    const xaxis = d3.axisTop().scale(xscale) // creating top axis
    const g_xaxis = g.append("g").attr("class", "x axis") // giving classes to top axis
    const yaxis = d3.axisLeft().scale(yscale) // creating left axis
    const g_yaxis = g.append("g").attr("class", "y axis") // giving classes to left axis

    const update = (new_data) => {
      xscale.domain([0, d3.max(new_data, (d) => d.population * 1000)]) // updating the top axis to data
      yscale.domain(new_data.map((d) => d.country)) // updating the left axis to data

      g_xaxis.transition().call(xaxis) // render of the x-axis with transition
      g_yaxis.transition().call(yaxis) // render of the y-axis with transition

      const rect = g
        .selectAll("rect")
        .data(new_data, (d) => d.country)
        .join(
          // Creating and selecting all bars for every country
          (enter) => {
            const rect_enter = enter.append("rect").attr("x", 0) // adding rect for every country
            rect_enter.append("title") // adding mouseover title attribute
            return rect_enter
          },
          (update) => update, // updating chart when filtering
          (exit) => exit.remove() // removing countries when filtering
        )

      rect
        .transition()
        .duration(1000)
        .attr("height", yscale.bandwidth()) // giving the height of each bar
        .attr("width", (d) => xscale(d.population * 1000)) // giving the with of each bar
        .attr("y", (d) => yscale(d.country)) // giving each country by bar
        .transition() // making new transition for the fills of the bar
        .duration(1000)
        .style("fill", "darkslateblue")
        .style("fill-opacity", ".8")

      rect.select("title").text((d) => numFormatter(d.population * 1000)) // giving population to mouseover
    }
    isAsia ? update(filteredAsia) : update(data)
  }

  useEffect(() => {
    makeSVG(data)
  }, [isAsia]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = () => {
    setIsAsia(!isAsia)
  }

  return (
    <>
      <Checkbox label="Asia" value={isAsia} onChange={handleChange} />
      <div ref={ref}></div>
    </>
  )
}
export default Barchart
