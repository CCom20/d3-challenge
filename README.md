# Healtcare vs. Poverty

This project looks at various states and the percentage of individuals with healthcare and the percentage of those in poverty. 

## About the dashboard

The code is wrapped in a function so the chart is resized based on window size. Instead of setting a pixel-width for the chart, I grabbed the width of the div based on the window size. 

    let divWidth = +d3.select("#scatter").style("width").slice(0, -2); 

