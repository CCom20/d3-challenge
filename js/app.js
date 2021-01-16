function respBubbleChart() {
    d3.csv("../data/data.csv").then(function(data){

        let svgBubble = d3.select("#scatter").select("svg");

        if (!svgBubble.empty()) {
            svgBubble.remove();
            }

        let bubbleWidth = +d3.select("#scatter").style("width").slice(0, -2);
        let bubbleHeight = 500;
    
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
    
        chartGroup.append("g").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(poverty[i]))
            .attr("cy", (d, i) => yScale(healthcare[i]))
            .attr("height", d => chartHeight - yScale(d))
            .attr("r", 15)
            .attr("fill", "steelblue")
            .attr("opacity", ".5");
    });
}

respBubbleChart();

d3.select(window).on("resize", respBubbleChart);