let bblSVGwidth = 850; 
let bblSVGheight = 500; 

let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", bblSVGwidth)
    .attr("height", bblSVGheight)

let svgMargins = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
}

var chartHeight = bblSVGheight - svgMargins.top - svgMargins.bottom;
var chartWidth = bblSVGwidth - svgMargins.left - svgMargins.right;

let chartGroup = svg.append("g")
    .attr("transform", `translate(${svgMargins.left}, ${svgMargins.top}`)


d3.csv("data/data.csv").then(function(data){

    data.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    }); 

    poverty = data.map(item => item.poverty); 
    healthcare = data.map(item => item.healthcare); 

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, data => data.healthcare)])
        .range([chartHeight, 0]);
    
    let xScale = d3.scaleLinear()
        .domain([d3.min(data , data => data.poverty) * .5, 
            d3.max(data, data => data.poverty)  * 1.5])
        .range([0, chartWidth])
    
    let yAxis = d3.axisLeft(yScale)
    let xAxis = d3.axisBottom(xScale)

    chartGroup.append("g")
        .attr("transform", `translate(${svgMargins.left}, ${chartHeight})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .attr("transform", `translate(${svgMargins.bottom}, 0)`)
        .call(yAxis)

    let chartCircles = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", xScale(poverty))
        .attr("cy", yScale(healthcare))
        .attr("height", d => chartHeight - yScale(d))
        .attr("r", 20)
        .attr("fill", "lightblue")
        .attr("opacity", ".5");
      
})