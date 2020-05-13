// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/data_diff.csv', d3.autoType),
  d3.csv('DATA_VIS2.csv', d3.autoType),
  d3.csv('DATA_VIS3.csv', d3.autoType),
  d3.json('data/countries.json'),
]).then(([data, DATA_VIS2, DATA_VIS3, geoJSON]) => {
  vis1(data, d3.select('#vis1'));
  vis2(DATA_VIS2, geoJSON, d3.select('#vis2'))
  vis3(DATA_VIS3, geoJSON, d3.select('#vis3'));
});
