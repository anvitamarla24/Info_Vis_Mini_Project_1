function vis1(data, div) {
	
  const height = 500;
  const width = 1000;
  const svg = div.append('svg')
      .attr('width', width)
      .attr('height', height);	  

  const margin = ({top: 10, right: 10, bottom: 125, left: 40});
  
  const groupKey = "Country";
  const keys = ["Aid_received", "Aid_donated"];
  
  const sortedNames = data.sort((a, b) => d3.descending(a.diff, b.diff))
      .map(d => d.Country);
  
  const x0 = d3.scaleBand()
    .domain(sortedNames)
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1);
  
  const x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top]);
  
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
    .call(g => g.select(".domain").remove());
  
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Amount in Million"));
  
  const color = d3.scaleOrdinal()
    .range(["red", "green"]);
  
  svg.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key)).attr("fill-opacity", 0.5)
	.append("title")
      .text(d =>`Amount:${Math.round(d.value)}Million`);
   
  // svg.selectAll("text")
  //  .style("text-anchor", "end")
  //  .attr("dx", "-.2em")
  //  .attr("dy", ".15em")
  //  .attr("transform", "rotate(-65)");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  // svg.append("g")
  //     .call(legend);
  
//legend
  const g = svg.append("g")
      .attr("transform", `translate(${width-100},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(color.domain().slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color).attr("fill-opacity", 0.5);

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);

}