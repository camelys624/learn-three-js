import Stats from "three/examples/jsm/libs/stats.module";

export function initStats(type) {
  let panelType = (typeof type !== "undefined" && type) && (!isNaN(type)) ? parseInt(type) : 0;
  let stats = new Stats();

  stats.showPanel(panelType);
  document.body.appendChild(stats.dom);
  return stats;
}