const url = async (planets, sectors) => {
  const url = await fetch(
    `https://farsite.online/api/1.0/universe/planets/${planets}/sectors/${sectors}/bases`
  );
  const respond = await url.json();
  return respond;
};
// change to your base
const sectors = [
  { planet: "CETO-2", sector: 15 },
  { planet: "HEBO-12", sector: 10 },
  { planet: "HOM-14", sector: 159 },
  { planet: "HOM-11", sector: 73 },
  { planet: "MEB-2", sector: 21 },
  { planet: "NEX-3", sector: 8 },
];

async function productionCycles(planet, sector) {
  const ActionsGroup_item = document.getElementsByClassName(
    "ActionsGroup -position-top"
  )[0];
  const corneredBox = document.createElement("div");
  corneredBox.style.padding = "10px";

  const baseBtn = document
    .getElementsByClassName("ControlBars_right")[0]
    .getElementsByClassName("ActionsGroup_item")[7];
  const getSector = await url(planet, sector);

  const sectorProgress1 = getSector[0].productionCyclesLeft;
  const sectorProgress2 = getSector[1].productionCyclesLeft;
  if (sector[2]) {
    var sectorProgress3 = getSector[2].productionCyclesLeft;
  }
  if (sectorProgress1 == 0 || sectorProgress2 == 0 || sectorProgress3 == 0) {
    baseBtn.style.boxShadow = "#66ff66 0px 0px 10px";
    baseBtn.style.backgroundColor = "#66ff66";
    corneredBox.innerHTML = "";
    corneredBox.innerHTML = `
        ${planet}-
        ${sector} finished
        `;
    ActionsGroup_item.appendChild(corneredBox);
  } else {
    baseBtn.style.boxShadow = "#FF0000 0px 0px 10px";
    baseBtn.style.backgroundColor = "#FF0000";
    corneredBox.innerHTML = `
        ${planet}-
        ${sector} working
        `;
    ActionsGroup_item.appendChild(corneredBox);
  }
}
setInterval(function () {
  for (let i = 0; i < sectors.length; i++) {
    productionCycles(sectors[i].planet, sectors[i].sector);
  }
}, 900000);
