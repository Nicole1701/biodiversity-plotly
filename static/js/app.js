// Fetch the JSON data and console log it
d3.json("data/samples.json").then((data) => {
  console.log(data);
});

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Id
 * index 1 - Ethnicity
 * index 2 - Gender
 * index 3 - Age
 * index 4 - Location
 * index 5 - BB Type
 * index 6 - Wfreq
 */

function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}
