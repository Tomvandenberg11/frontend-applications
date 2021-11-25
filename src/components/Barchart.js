import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react'
import { scaleLinear, scaleBand } from "d3-scale";

const Barchart = () => {
  const ref = useRef();

  const margin = {top: 40, bottom: 10, left: 120, right: 20}
  const width = 1000 - margin.left - margin.right
  const height = 600 - margin.top - margin.bottom

  const numFormatter = (num) => { // refactoring numbers
    if (num > 1000000000) {
      return (num/10000000).toFixed(0) + ' billion'
    } else {
      return (num/1000000).toFixed(0) + ' million'
    }
  }

  const svg = d3.select('body').append('svg') // making svg element in the body
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom)

  const g = svg.append('g') // using group element in svg for margins
    .attr('transform', `translate(${margin.left},${margin.top})`)

// Global variable
  let data
  let filtered_data

// Scales setup
  const xscale = scaleLinear().range([0, width]) // scaleLinear for lineair data
  const yscale = scaleBand().rangeRound([0, height]).paddingInner(0.1) // scaleband for ordinal data, the countries

// Axis setup
  const xaxis = d3.scale(xscale) // creating top axis
  const g_xaxis = g.append('g').attr('class','x axis') // giving classes to top axis
  const yaxis = d3.scale(yscale) // creating left axis
  const g_yaxis = g.append('g').attr('class','y axis') // giving classes to left axis

// Importing CSV
  d3.csv('https://raw.githubusercontent.com/Tomvandenberg11/frontend-data/main/data.csv').then((csv) => { // importing csv file as csv file with D3 function
    data = csv
    update(data)
  })

  const update = (new_data) => {
    xscale.domain([0, d3.max(new_data, (d) => d.population * 1000)]) // updating the top axis to data
    yscale.domain(new_data.map((d) => d.country)) // updating the left axis to data

    g_xaxis.transition().call(xaxis) // render of the x-axis with transition
    g_yaxis.transition().call(yaxis) // render of the y-axis with transition

    const rect = g.selectAll('rect').data(new_data, (d) => d.country).join( // Creating and selecting all bars for every country
      (enter) => {
        const rect_enter = enter.append('rect').attr('x', 0) // adding rect for every country
        rect_enter.append('title') // adding mouseover title attribute
        return rect_enter
      },
      (update) => update, // updating chart when filtering
      (exit) => exit.remove() // removing countries when filtering
    )

    rect.transition()
      .duration(800)
      .attr('height', yscale.bandwidth()) // giving the height of each bar
      .attr('width', (d) => xscale(d.population * 1000)) // giving the with of each bar
      .attr('y', (d) => yscale(d.country)) // giving each country by bar
      .transition() // making new transition for the fills of the bar
      .duration(500)
      .style('fill', 'indianred')
      .style('fill-opacity', '.8')

    rect.select('title').text((d) => numFormatter(d.population * 1000) ) // giving population to mouseover
  }
  return (
    <div className="chart">
      <svg ref={ref}>
      </svg>
    </div>
  )
}

export default Barchart