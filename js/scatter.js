function vis1 () {
// code example from : https://bl.ocks.org/mbostock/3887118

var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var svg = d3.select("#vis1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select(".vis1 .chart").append("div")
      .attr("class", "tooltip")
      .style("display", "none");

d3.json("earthq_sample2.json", function(error, data) {
	  if (error) return console.warn(error);

  console.log(data);

  data.features = data.features.filter(function(d) { 
    return d.properties.mag > 0
  });

  for (var i = 0; i < data.features.length; i++) {
		var feature = data.features[i];
		feature.properties.jsDate = (new Date(feature.properties.time));
	}

  console.log(data.features)

  x.domain(d3.extent(data.features, function(d) { return d.properties.jsDate; }));
  y.domain(d3.extent(data.features, function(d) { return d.properties.mag; }));
  console.log(x.domain(), y.domain());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 24)
      .style("text-anchor", "end")
      .style('fill', '#000')
      .text("Date");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", -40)
      .style("text-anchor", "end")
      .style('fill', '#000')
      .text("Magnitude")

    svg.append('g').selectAll(".dot")
      .data(data.features)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("cx", function(d) { return x(d.properties.jsDate); })
      .attr("cy", function(d) { return y(d.properties.mag); })
      .style("fill", function(d) { return "#000000"; })
      .style('opacity', 0.5)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);


});


function mouseover(d) {
  var mouse = d3.mouse(this)
  console.log(this, mouse, d3.event.pageX, d3.event.pageY)

  div.style("display", "inline");
  div
      .html("Magnitude: " + d.properties.mag + "<br>Location: " + d.properties.place)
      .style("left", mouse[0] + margin.left + "px")
      .style("top", mouse[1] + margin.top + "px")
      .style('transform', 'translate(-50%, -50%)');
}


function mouseout() {
  div.style("display", "none");
 }
}
vis1()