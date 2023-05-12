import { mapboxApiToken } from "./mapboxapi.js";
const serverUrl = "https://diarysite.onrender.com";

mapboxgl.accessToken = mapboxApiToken;
const map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v12",
center: [-77.04, 38.907],
zoom: 11.15,
});

map.on("load", async () => {
let data = await getGeoJsonObj();

createPlacesButtons(data);

loadFavourites(1);

map.addSource("places", {
type: "geojson",
data: data,
});

map.addLayer({
id: "places",
type: "symbol",
source: "places",
layout: {
"icon-image": ["get", "icon"],
"icon-allow-overlap": true,
},
});

map.on("click", "places", (e) => {
const coordinates = e.features[0].geometry.coordinates.slice();
const description = e.features[0].properties.description;


while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);

map.flyTo({
  center: coordinates,
  zoom: 15,
});
});

map.on("mouseenter", "places", () => {
map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "places", () => {
map.getCanvas().style.cursor = "";
});

let buttons = document.getElementsByClassName("placeButton");

for (let i = 0; i < buttons.length; i++) {
buttons[i].onclick = () => {
let coorDescrArray = getFeaturesByDescriptionSubstring(
buttons[i].innerText,
data
);

  for (let j = 0; j < coorDescrArray.length; j++) {
    if (
      extractString(coorDescrArray[j].description) == buttons[i].innerText
    ) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      if (popUps[0]) popUps[0].remove();

      new mapboxgl.Popup()
        .setLngLat(coorDescrArray[j].coordinates)
        .setHTML(coorDescrArray[j].description)
        .addTo(map);

      map.flyTo({
        center: coorDescrArray[j].coordinates,
        zoom: 15,
      });
    }
  }
};
}
});

createOpenNavElem();

async function getGeoJsonObj() {
const response = await fetch(${serverUrl}/geojson);

if (response.status == 200) {
const geoJsonData = await response.json();
return geoJsonData;
} else {
throw new Error("Unable to fetch geojson data");
}
}

async function getIdDescrObj() {
const response = await fetch(${serverUrl}/geojson/iddescr);

if (response.status == 200) {
const geoJsonData = await response.json();
return geoJsonData;
} else {
throw new Error("Unable to fetch iddescr data");
}
}

async function getFavIdFromPointId(id) {
const response = await fetch(${serverUrl}/favourites/${id});

if (response.status == 200) {
const data = await response.json();
return data.id;
