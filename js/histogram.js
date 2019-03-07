// code example from: https://bl.ocks.org/mbostock/3048450
function vis2 () {
var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#vis2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear()
    .range([0, width]);


var y = d3.scaleLinear()
    .range([height, 0]);


d3.json("earthq_sample2.json", function(error, data) {
	 if (error) return console.warn(error);


	 var features = data.features


	 x.domain(d3.extent(features, function(d) {return d.properties.mag}))


	var bins = d3.histogram()
		.thresholds(x.ticks(20))
		.value(function(d) { return d.properties.mag;})
		.domain(x.domain())

 
 	 var binData = bins(features)

	 y.domain(d3.extent(binData, function(d) {return d.length}))

	 var bar = svg.selectAll(".bar")
        .data(binData)
  	    .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

	 bar.append("rect")
    	.attr("x", 1)
    	.attr("width", x(binData[0].x1) - x(binData[0].x0) - 1)
    	.attr("height", function(d) { return height - y(d.length); });

	svg.append("g")
    	.attr("class", "axis axis--x")
    	.attr("transform", "translate(0," + height + ")")
    	.call(d3.axisBottom(x));


    console.log(binData)

  });

}
vis2()
