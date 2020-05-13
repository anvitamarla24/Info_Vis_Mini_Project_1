function vis2(data, geoJSON, div) {
	
  const height = 500;
  const width = 1000;

const svg = div.append('svg')
      .attr('width', width)
      .attr('height', height);

const projection =  d3.geoEqualEarth()
      .fitSize([width, height], geoJSON);

  const path = d3.geoPath().projection(projection);

  var g1 = svg.append("g");

   g1.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', '#dcdcdc')
      .attr('stroke', 'white');


  var g2 = svg.append("g");

  //const stateToRate = Object.fromEntries(new Map(data.map(d => [d.country, d.total])));
  

  const maxx = d3.max(data, d => d.total);
  
  const maxRadius = 25;
  const radius = d3.scaleSqrt()
      .domain([0, maxx])
      .range([5, maxRadius]);

 // var arc = d3.arc()
	//		.innerRadius(0).outerRadius(10)
			//.outerRadius(function(d, i) {return radius(data[i].total);})
			
 /* var pie = d3.pie()
			.sort(null)
			.value(function(d) { return [d.Donate, d.Receive]; });*/
			
  var color = d3.schemeCategory10;
// console.log(color);


// d3.csv("C:\Users\anvit\OneDrive\Desktop\info-vis-project-template-master\stats1.csv", function(error, water) {


	// Append one g element for each row in the csv and bind data to it:
	var points = g2.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("transform",function(d) { return "translate("+projection([d.longitude,d.latitude])+")" })
		.attr("id", function (d,i) { return "chart"+i; })
		.append("g").attr("class","pies")
	
	// Add a circle to it if needed
	points.append("circle")
		.attr("r", 11)
        .style("fill", "none");
	
    // Select each g element we created, and fill it with pie chart:
	var pies = points.selectAll(".pies")
		.data((d) => {
                let a = d3.pie().value((x) => x)([d.aid_d, d.aid_r]);
                a.forEach((x, i) => {
                    if(i == 0) x["key"] = "aid_d";
                    else x["key"] = "aid_r";
                    x["total"] = d.total;
                })
                return a;
            }) // I'm unsure why I need the leading 0.
		.enter()
		.append('g')
		.attr('class','arc');
		
  points.append("title")
      .text(d => `Country: ${d.country}
Donated: ${Math.round(d.aid_d)}Million
Received: ${Math.round(d.aid_r)}Million`)
	
	pies.append("path")
	  .attr('d',(d,i) => {
                return d3.arc().innerRadius(0).outerRadius(radius(d.total))(d);
            })
    .attr("fill",function(d,i){
           return color[i];      
      })
    .attr("fill-opacity", 0.5)
	
var ordinal = d3.scaleOrdinal()
  .domain(["Donated", "Received"])
  .range(d3.schemeCategory10);


const g = svg.append("g")
      .attr("transform", `translate(${width-50},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(ordinal.domain().slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", ordinal)
	  .attr("fill-opacity", 0.5);

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);

}
