const { parse } = require("csv-parse");
const fs = require("fs");
let records = [];

fs.createReadStream("kepler_data.csv").on("data", (data) => {
  records.push(data);
});
