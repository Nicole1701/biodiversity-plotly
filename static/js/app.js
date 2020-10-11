// Initialize the page with a default ID
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  d3.json("data/samples.json").then((bbData) => {
    console.log(bbData);

    let subId = bbData.names;
    subId.forEach(function (name) {
      dropdownMenu.append("option").text(name).property("value");
    });

    demoTable(bbData.subId[0]);
  });
}

//Build demograhics table
function demoInfo(subject) {
  //Read in json data
  d3.json("data/samples.json").then((bbData) => {
    console.log(bbData.metadata);

    //Build the Demo Table
    let demo = bbData.metadata.filter((item) => item.id == subject);
    let demoResult = demo[0];
    console.log(demoResult);
    let demoTable = d3.select("#sample-metadata");

    //Clear any previous data from the table
    demoTable.html("");

    Object.entries(demoResult).forEach(([key, value]) => {
      demoTable.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// demoInfo();
init();

// /**
//  * Helper function to select data
//  * Returns an array of values
//  * @param {array} rows
//  * @param {integer} index
//  * index 0 - id
//  * index 1 - otu_ids
//  * index 2 - sample_values
//  * index 3 - otu_labels

//  */
// d3.json("data/samples.json").then((data) => {
//   console.log(data);

//   function buildPlot(bar) {
//     // Fetch the JSON data and console log it

//     var ids = data.samples[0].id;
//     console.log(ids);
//     var otu = data.samples[0].otu_ids;
//     console.log(otu);
//     var values = sampledata.samples[0].sample_values;
//     console.log(values);
//     var labels = bdata.samples[0].otu_labels;
//     console.log(labels);
//   }

//   var trace1 = {
//     type: "bar",
//     x: values,
//     y: otu,
//   };

//   var data = [trace1];

//   var layout = {
//     title: `${id} OTU ID's`,
//     xaxis: { title: "OTU ID" },
//     yaxis: { title: "Sample Values" },
//   };

//   Plotly.newPlot("bar", data, layout);

//   buildPlot(bar);
// });

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
