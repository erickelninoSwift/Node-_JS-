const { parse } = require("csv-parse");
const fs = require("fs");
let records = [];

fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    return records.push(data);
  })
  .on("end", () => {
    console.log("data was fetched succesfully");
    console.log(records);
  })
  .on("error", (error) => {
    console.log("error was foudn ", error);
  });
