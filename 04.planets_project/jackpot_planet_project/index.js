const { parse } = require("csv-parse");
const fs = require("fs");
let habitablePlanets = [];

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) {
      return habitablePlanets.push(data);
    }
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet.kepler_name;
      })
    );
    console.log(
      `The amount of planets habitable found : ${habitablePlanets.length}`
    );
  })
  .on("error", (error) => {
    console.log("error was foudn ", error);
  });
