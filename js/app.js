d3.csv("/data/data.csv").then(function(data){

    stateNames = data.map(item => item.state);
    // console.log(stateNames)

    d3.select("#scatter").append("ul").selectAll("li")
        .data(stateNames)
        .enter()
        .append("li")
        .text(function(d) { 
            return d});
})