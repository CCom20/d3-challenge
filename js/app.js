// Set up function to create chart
function respBubbleChart() {
    d3.csv("../data/data.csv").then(function(data){

        // Select Bubble chart
        let svgBubble = d3.select("#scatter").select("svg");

        // If the Bubble chart is there, clear it (for recreating based on window size)
        if (!svgBubble.empty()) {
            svgBubble.remove();
            }

        // Grab width and height of the chart
        let bubbleWidth = +d3.select("#scatter").style("width").slice(0, -2);
        let bubbleHeight = 500;
    
        // Set up the SVG
        let svg = d3.select("#scatter")
            .append("svg")
            .attr("width", bubbleWidth)
            .attr("height", bubbleHeight); 
    
        let divWidth = +d3.select("#scatter").style("width").slice(0, -2);
            console.log(divWidth); 
    
        let svgMargins = {
            top: 25,
            right: 50,
            bottom: 50,
            left: 50
        }; 
    
        var chartHeight = bubbleHeight - svgMargins.top - svgMargins.bottom;
        var chartWidth = bubbleWidth - svgMargins.left - svgMargins.right;
    
        let chartGroup = svg.append("g")
        .attr("transform", `translate(${svgMargins.left / 2}, ${svgMargins.top / 2})`); 
    
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
            .domain([d3.min(data , data => data.poverty) * .7, 
                d3.max(data, data => data.poverty)])
            .range([0, chartWidth]); 
        
        let yAxis = d3.axisLeft(yScale); 
        let xAxis = d3.axisBottom(xScale); 
    
    
        chartGroup.append("g")
            .attr("transform", `translate(${svgMargins.left}, ${chartHeight})`)
            .call(xAxis);
        
        chartGroup.append("g")
            .attr("transform", `translate(${svgMargins.bottom}, 0)`)
            .call(yAxis); 
        
        chartGroup.append("text")
            .attr("transform", `translate(${bubbleWidth / 2}, ${chartHeight + svgMargins.top * 2})`)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "black")
            .text("% in Poverty");
        
        chartGroup.append("text")
            .attr("transform", `translate(0, ${chartHeight / 2}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "black")
            .text("% Lacking Healthcare");
        
        chartGroup.append("g").selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xScale(d.poverty))
            .attr("y", d => yScale(d.healthcare) + 5)
            .attr("fill", "black")
            .attr("text-anchor", "middle"); 
    
        let circlesGroup = chartGroup.append("g").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(poverty[i]))
            .attr("cy", (d, i) => yScale(healthcare[i]))
            .attr("height", d => chartHeight - yScale(d))
            .attr("r", 15)
            .attr("fill", "steelblue")
            .attr("opacity", ".5");
        
        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([20, -90])
        .html(function(d) {
            return (`<strong>State:</strong> ${d.abbr}<br /><strong>Poverty:</strong> ${d.poverty}%<br /><strong>Lack Healthcare:</strong> ${d.healthcare}%
            `);
        });

        // Call tooltip.
        chartGroup.call(toolTip);

        // Set functions for mouseover and mouseout
        circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
        })
        .on("mouseout", function(d) {
            toolTip.hide(d);
        });
    });
}

// 
respBubbleChart();

d3.select(window).on("resize", respBubbleChart);