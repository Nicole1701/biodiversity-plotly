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

    // Append the data to the data and make key uppercase
    Object.entries(demoResult).forEach(([key, value]) => {
      demoTable.append("h5").text(key.toUpperCase() + ": " + value);
    });
  });
}

function buildPlot(subject) {
  // Create chart
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

  // Fetch the JSON data and console log it
  d3.json("data/samples.json").then((bbData) => {
    // Filter for the data based on the subject ID selected and save in array
    let barArr = bbData.samples.filter((item) => item.id == subject);
    console.log(barArr);

    let barResult = barArr[0];
    console.log(barResult);

    // Create variables
    let otu = barResult.otu_ids;
    console.log(otu);

    let sampleValues = barResult.sample_values;
    console.log(sampleValues);

    let otuLabels = barResult.otu_labels;
    console.log(otuLabels);

    //Sample Values already appear sorted so slice top 10 and reverse for chart
    let topValues = sampleValues.slice(0, 10).reverse();
    console.log(topValues);

    //Sort otu labels and reverse
    let topOtu = otu.slice(0, 10).reverse();
    console.log(topOtu);

    //Attach text 'OTU' to label
    let topOtuLabel = topOtu.map((item) => "OTU " + item);
    console.log(topOtuLabel);

    // Create hovertext labels
    let otuHover = barResult.otu_labels;
    console.log(otuHover[0]);

    let topOtuHover = otuHover.slice(0, 10).reverse();
    console.log(topOtuHover);

    // Create the bar chart trace
    let trace1 = {
      x: topValues,
      y: topOtuLabel,
      type: "bar",
      orientation: "h",
      color: "blue ",
      hovertext: topOtuHover,
    };

    let data1 = [trace1];

    // Set bar chart title and margin size to better fit space
    //plotly.com/python/setting-graph-size/
    let layout1 = {
      title: `Subject ID: ${subject}`,
      height: 400,
      margin: {
        l: 75,
        r: 75,
        t: 50,
        b: 30,
      },
    };

    // Plot the graph
    Plotly.newPlot("bar", data1, layout1);

    // Create the bubble chart
    let trace2 = {
      x: otu,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otu,
        colorscale: "Portland",
      },
      text: otuLabels,
    };

    let data2 = [trace2];

    let layout2 = {
      title: `Subject ID: ${subject}`,
      margin: {
        t: 50,
        b: 30,
      },
    };

    // Plot the chart
    Plotly.newPlot("bubble", data2, layout2);

    // Gauge Chart
    let gaugeData = bbData.metadata.filter(
      (item) => item.id.toString() == subject
    );
    console.log(gaugeData);

    let wfreq = gaugeData.map((item) => item.wfreq);
    console.log(wfreq);

    // Build Gauge Chart
    // plotly.com/javascript/gauge-charts/
    let data3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseFloat(wfreq),
        title: {
          text: `Subject ID: ${subject}  <br> Belly Button Washing Frequency <br> Scrubs Per Week`,
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "royalblue" },
            { range: [1, 2], color: "cyan" },
            { range: [2, 3], color: "royalblue" },
            { range: [3, 4], color: "cyan" },
            { range: [4, 5], color: "royalblue" },
            { range: [5, 6], color: "cyan" },
            { range: [6, 7], color: "royalblue" },
            { range: [7, 8], color: "cyan" },
            { range: [8, 9], color: "royalblue" },
          ],
        },
      },
    ];

    // Set Layout
    let layout3 = {
      width: 460,
      height: 400,
      margin: { t: 0, r: 25, l: 25, b: 0 },
    };

    // Plot the chart
    Plotly.newPlot("gauge", data3, layout3);
  });
}

// Change event function
function optionChanged(subject) {
  demoInfo(subject);
  buildPlot(subject);
}

init();
