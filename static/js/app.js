/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - sample_values
 * index 3 - otu_labels

 */

function buildPlot(bar) {
  // Fetch the JSON data and console log it
  var bbdata = d3.json("data/samples.json").then((bbdata) => {
    console.log(bbdata);
    let ids = bbdata.samples[0].id;
    console.log(ids);
    let otu = bbdata.samples[1].otu_ids;
    console.log(otu);
    let values = bbdata.samples[2].sample_values;
    console.log(values);
    let labels = bbdata.samples[3].otu_labels;
    console.log(labels);
  });

  var trace1 = {
    type: "bar",
    x: values,
    y: otu,
    line: {
      color: "#17BECF",
    },
  };

  var bbdata = [trace1];

  var layout = {
    title: `${id} OTU ID's`,
    xaxis: { title: { text: "OTU ID" } },
    yaxis: { title: { text: "Sample Values" } },
  };

  Plotly.newPlot("plot", bbdata, layout);
}

buildPlot(bar);
// Fetch the JSON data and console log it
// let bbdata = d3.json("data/samples.json").then((bbdata) => {
//   console.log(bbdata);
//   var ids = bbdata.samples[0].id;
//   console.log(ids);
//   var otu = bbdata.samples[1].otu_ids;
//   console.log(otu);
//   var values = bbdata.samples[2].sample_values;
//   console.log(values);
//   var labels = bbdata.samples[3].otu_labels;
//   console.log(labels);
// });
