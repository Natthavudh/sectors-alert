// ==UserScript==
// @name         Sectors Alert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://play.farsite.online/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=farsite.online
// @grant        none
// ==/UserScript==

const observer = new MutationObserver((mutations, obs) => {
  const ActionsGroup_item = document.getElementsByClassName(
    "ActionsGroup -position-top"
  )[0];
  if (ActionsGroup_item) {
    ActionsGroup_item.appendChild(button);
    runProgress();

    obs.disconnect();
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

const button = document.createElement("div");
button.style.paddingLeft = "0.3rem";
button.innerHTML = `
    <button data-v-edcc911a="" class="Action -with-icon -with-label -adaptive -tooltip- -size-m -width-default">
    <close
    data-v-edcc911a="" class="Action_icon"><svg data-v-edcc911a="" viewBox="0 0 19 13" fill="none"
      xmlns="http://www.w3.org/2000/svg" class="Icon" style="color: currentcolor; width: 100%; height: 100%;">
      <path data-v-edcc911a=""
        d="M3.198 0h-.002a.633.633 0 00-.442.177.596.596 0 00-.185.432v9.13c0 .335.283.608.631.61 1.468.003 3.928.298 5.625 2.012V2.806c0-.114-.03-.22-.087-.308C7.346.332 4.67.003 3.198 0zM16.06 9.74V.608a.596.596 0 00-.185-.432.633.633 0 00-.442-.177h-.002c-1.471.003-4.147.332-5.54 2.498a.568.568 0 00-.087.308v9.555c1.697-1.714 4.157-2.01 5.625-2.013a.622.622 0 00.631-.609z"
        fill="currentColor"></path>
      <path data-v-edcc911a=""
        d="M17.497 2.106h-.458v7.633c0 .855-.721 1.552-1.608 1.554-1.245.003-3.298.239-4.753 1.567 2.515-.594 5.167-.208 6.677.125a.647.647 0 00.535-.118.598.598 0 00.237-.476V2.714a.62.62 0 00-.63-.608zM1.59 9.74V2.105h-.458a.62.62 0 00-.63.608v9.677c0 .186.086.36.237.476.15.116.345.159.534.117 1.511-.332 4.163-.719 6.678-.124-1.455-1.329-3.508-1.564-4.753-1.566-.887-.003-1.608-.7-1.608-1.555z"
        fill="currentColor"></path>
    </svg></close><close data-v-edcc911a="" class="Action_label">Base</close>
    <!---->
    <!---->
    </button>
    `;

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
wrapper.style.display = "flex";
wrapper.style.height = "100%";
wrapper.style.width = "250px";
wrapper.style.backgroundColor = "#071428";
wrapper.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.35)";
wrapper.style.flexShrink = "0";
//wrapper.style.right = "0";
wrapper.style.position = "absolute";
wrapper.style.padding = "10px";
wrapper.style.margin = "10px";

var main = document.createElement("div");
main.classList.add("main");
main.style.flexGrow = "1";
main.style.width = "100px";
main.style.overflowY = "auto";
main.style.padding = "10px";
//main.innerHTML = "";
wrapper.append(main);

const close = document.createElement("div");
close.classList.add("material-icons-sp-icon-close");
close.style.cursor = "pointer";
close.style.height = "10px";
close.style.padding = "10px";
close.style.margin = "0px";
close.innerHTML = "X";
wrapper.append(close);

//document.body.append(wrapper);

button.addEventListener("click", openPanel);
close.addEventListener("click", closePanel);

function openPanel() {
  document.body.append(wrapper);
}
function closePanel() {
  wrapper.remove();
}

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
  const baseBtn = document
    .getElementsByClassName("ControlBars_right")[0]
    .getElementsByClassName("ActionsGroup_item")[7];

  baseBtn.style.boxShadow = "#FF0000 0px 0px 10px";
  baseBtn.style.backgroundColor = "#FF0000";

  const getSector = await url(planet, sector);

  for (let i = 0; i < getSector.length; i++) {
    if (getSector[i]) {
      var sectorProgress = getSector[0].productionCyclesLeft;
    }
  }
  if (sectorProgress === 0) {
    baseBtn.style.boxShadow = "#66ff66 0px 0px 10px";
    baseBtn.style.backgroundColor = "#66ff66";
    main.insertAdjacentHTML(
      "afterbegin",
      `
        ${planet}-${sector} <p style="color:#66ff66">Finished</p><br>
        `
    );
  } else {
    main.insertAdjacentHTML(
      "afterbegin",
      `
        ${planet}-${sector} <p style="color:red">in Progress</p><br>
        `
    );
  }
}

function runProgress() {
  main.innerHTML = "";

  for (let i = 0; i < sectors.length; i++) {
    productionCycles(sectors[i].planet, sectors[i].sector);
  }
}

setInterval(() => {
  runProgress();
}, 900000); //change interval 1000 = 1 second, 900000 = 15 minutes
