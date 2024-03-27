const { parse } = require("csv-parse");
const { hasSubscribers } = require("diagnostics_channel");
const fs = require("fs");

const HabitablePlanet = [];

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("./files/kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) {
      HabitablePlanet.push(data);
    }
  })
  .on("error", (error) => {
    console.log("Error was found", error);
  })
  .on("end", () => {
    console.log(
      HabitablePlanet.map((currentPlanet) => {
        return currentPlanet.kepler_name;
      })
    );
    console.log(`The amount of planets found : ${HabitablePlanet.length}`);
  });
