# Info Vis Mini Project 1

## Running the code

To run the website, execute the command `python3 -m http.server` in this directory and then go to http://0.0.0.0:8000/ in your browser.

## Contents

* `index.html` contains the basic HTML structure and links to the CSS and JS files.

* `style.css` contains CSS rules.

* `d3` contains the D3 library.

* `data` contains datasets used by the visualizations. For now there is a toy dataset that contains the scores for a game and `countries.json`, which is a GeoJSON file for world countries. This file is derived from data from [Natural Earth](https://www.naturalearthdata.com).

* `main.js` loads the datasets and then calls the visualization functions.

* `visualizations` contains the code to make the visualizations. As an example, right now there is a bar chart and an empty world map.
