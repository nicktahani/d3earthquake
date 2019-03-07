// code example for map: http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71
// code example for circles: https://bl.ocks.org/almccon/461d610e94d12d0a3cca8e530d3b03cd
function vis3() {
    var width = 960;
    var height = 500;
    
    var svg = d3.select("#vis3").attr('width', width).attr('height', height)

    //load map first
    var basemap = svg.append('g')
    var points = svg.append('g')

    var projection = d3.geoMercator()
      .scale(width / 2 / Math.PI)

      .translate([width / 2, height / 2])
      .rotate([width/2, 0, 0]) //rotating towards center 


    var path = d3.geoPath()
      .projection(projection);

    var color = d3.scaleTime()
   	  .range(['#af6205', '#e80606']);
    	
    var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    d3.json(url, function(err, geojson) {
      basemap.append("path")
        .attr("d", path(geojson))
    })


d3.json("earthq_sample2.json", function(error, data) {
	  if (error) return console.warn(error);

     var circleRadius = d3.scaleSqrt()
       .domain(d3.extent(data.features, function(d) { return +d.properties.mag; }))
       .range([0, 20]); 

       console.log(circleRadius.domain())

	for (var i = 0; i < data.features.length; i++) {
			var feature = data.features[i];
			feature.properties.jsDate = (new Date(feature.properties.time));
	}

	color.domain(d3.extent(data.features, function(d) { return d.properties.jsDate; }));

points.selectAll("circle")
  .data(data.features)
 .enter().append("circle")
  .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
  .attr("r", function(d) { return circleRadius(+d.properties.mag); })
  .style("fill", function(d) { return color(+d.properties.jsDate); })
  .style('opacity', 0.75)
  .on("mouseover", mouseover)
  .on("mouseout", mouseout);



  });

var div = d3.select(".vis3 .chart").append("div")
    .attr("class", "tooltip")
    .style("display", "none");


function mouseover(d) {
  div.style("display", "inline");
  div
      .html("Magnitude: " + d.properties.mag + "<br>Location: " + d.properties.place)
      .style('left', '0px')
      .style('top', '0px')
      .style('transform', d3.select(this).style('transform'))
}


function mouseout() {
  div.style("display", "none");
}

  }

  vis3()

