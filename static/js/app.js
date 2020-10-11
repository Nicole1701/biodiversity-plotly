// Initialize the page with a default ID
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  d3.json("data/samples.json").then((bbData) => {
    console.log(bbData);

    bbData.names.forEach(function (name) {
      dropdownMenu.append("option").text(name).property("value");
    });

    //Dislay data for charts/tables on the page
    demoInfo(bbData.names[0]);
    buildPlot(bbData.names[0]);
  });
}

//Build demograhics table
function demoInfo(subject) {
  //Read in json data
  d3.json("data/samples.json").then((bbData) => {
    console.log(bbData.metadata);

    // Filter metadata for display
    let demo = bbData.metadata.filter((item) => item.id.toString() == subject);
    console.log(demo);

    // Identify the result to display
    let demoResult = demo[0];
    console.log(demoResult);

    // Use D3 to select the demo table
    let demoTable = d3.select("#sample-metadata");

    //Clear any previous data from the table
    demoTable.html("");

    // Append the data to the data
    Object.entries(demoResult).forEach(([key, value]) => {
      demoTable.append("h5").text(key.toUpperCase() + ": " + value);
    });
  });
}

// Create horizontal bar chart
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

function buildPlot(subject) {
  // Fetch the JSON data and console log it
  d3.json("data/samples.json").then((bbData) => {
    //Set variables
    let barArr = bbData.samples.filter((item) => item.id == subject);
    // console.log(barArr);

    var barResult = barArr[0];
    console.log(barResult);
  });

  let otu = barResult.otu_ids;
  console.log(otu);
  // let labels = barResult.otu_labels;
  // console.log(labels);
}

// Change event function
function optionChanged(subject) {
  demoInfo(subject);
  buildPlot(subject);
}

init();
