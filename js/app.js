let bblSVGwidth = 750; 
let bblSVGheight = 500; 

let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", bblSVGwidth)
    .attr("height", bblSVGheight)

let svgMargins = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 75
}

var chartHeight = bblSVGheight - svgMargins.top - svgMargins.bottom;
var chartWidth = bblSVGwidth - svgMargins.left - svgMargins.right;

let chartGroup = svg.append("g")
    .attr("transform", `translate(${svgMargins.left}, ${svgMargins.top}`)


d3.csv("data/data.csv").then(function(data){

    data.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })

    let yScale = d3.scaleLinear()
        .domain([d3.min(data, d => data.healthcare) * .5,
             d3.max(data, d => data.healthcare) * 1.5])
        .range([chartHeight, 0]);
    
    let xScale = d3.scaleLinear()
        .domain([d3.min(data , d => data.poverty) * .5, 
            d3.max(data, d => data.poverty)  * 1.5])
        .range([0, chartWidth])
    
    let yAxis = d3.axisLeft(yScale)
    let xAxis = d3.axisBottom(xScale)

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .call(yAxis)

    chartGroup.selectAll(".bar")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(data.poverty))
        .attr("cy", d => yScale(data.healthcare))
        .attr("height", d => chartHeight - yScale(d));
      
})