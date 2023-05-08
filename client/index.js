// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken =
  "";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-77.04, 38.907],
  zoom: 11.15,
});

map.on("load", async () => {
  map.loadImage(
    "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png", //need to get these images from backend / host them somewhere
    async (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage("cat", image);

      //get our geojson data from the database
      let data = await getGeoJsonObj();
      console.log(data);

      //add geojson data to mapbox
      map.addSource("places", data);
      //getGeoJsonData()

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "cat", // ['get', 'icon'],
          "icon-allow-overlap": true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on("click", "places", (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
      });
    }
  );
});

//function to get the geojson object from the db
async function getGeoJsonObj() {
  const response = await fetch("http://localhost:3000/geojson");

  if (response.status == 200) {
    const geoJsonData = await response.json();
    //console.log(geoJsonData[0].data)
    return geoJsonData[0]; //get the first element in the array - need to rewrite model? / stringify here?
  } else {
    return "error";
  }
}

// function getGeoJsonData() {
//   let obj = {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           properties: {
//             description:
//               '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//             icon: "theatre-15",
//           },
//           geometry: {
//             type: "Point",
//             coordinates: [-77.038659, 38.931567],
//           },
//         },
//       ],
//     },
//   };

//   console.log(obj);
//   return obj;
// }
