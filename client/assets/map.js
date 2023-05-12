import { mapboxApiToken } from "./mapboxapi.js";
const serverUrl = "https://diarysite.onrender.com";

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapboxApiToken;
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-0.061725, 51.588963],
  zoom: 13,
});

map.on("load", async () => {

  //get our geojson data from the database
  let data = await getGeoJsonObj(); //.then( resp => createPlacesButtons(resp));
  //console.log(data);
  createPlacesButtons(data);

  loadFavourites(1) //HARDCORDED USER ID

  //add geojson data to mapbox
  map.addSource("places", data);
  //getGeoJsonData()

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": ["get", "icon"],
      "icon-allow-overlap": true,
    },
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.

  // do this also when user selects location from dropdown menu -how?

  map.on("click", "places", (e) => {
    //console.log(e)
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);

    map.flyTo({
      center: coordinates,
      zoom: 15
    });
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "places", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
  });

  let buttons = document.getElementsByClassName("placeButton");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = () => {
      console.log(buttons[i].innerText);

      let coorDescrArray = getFeaturesByDescriptionSubstring(buttons[i].innerText, data)

      console.log(coorDescrArray)

      for (let j = 0; j < coorDescrArray.length; j++) // how to get rid of other open popups? / also to center the map on the popup
      {
        if (extractString(coorDescrArray[j].description) == buttons[i].innerText)
        {

          const popUps = document.getElementsByClassName('mapboxgl-popup');
          /** Check if there is already a popup on the map and if so, remove it */
          if (popUps[0]) popUps[0].remove();

          new mapboxgl.Popup().setLngLat(coorDescrArray[j].coordinates).setHTML(coorDescrArray[j].description).addTo(map);

          map.flyTo({
            center: coorDescrArray[j].coordinates,
            zoom: 15
          });
        }
      }
    };
  }
});

//for the sidebar
createOpenNavElem();

//function to get the geojson object from the db
async function getGeoJsonObj() {
    const response = await fetch(`${serverUrl}/geojson`);

//   const response = await fetch("http://localhost:3000/geojson");

  if (response.status == 200) {
    const geoJsonData = await response.json();
    //console.log(geoJsonData)
    return geoJsonData;
  } else {
    return "error";
  }
}

async function getIdDescrObj() {
    const response = await fetch(`${serverUrl}/geojson/iddescr`);
  if (response.status == 200) {
    const geoJsonData = await response.json();
    //console.log(geoJsonData)
    return geoJsonData;
  } else {
    return "error";
  }
}

async function getFavIdFromPointId(id) {
  const response = await fetch(`${serverUrl}/favourites/fav/${id}`);

  if (response.status == 200) {
    const fav_id = await response.json();
    //console.log(geoJsonData)
    return fav_id;
  } else {
    return "error";
  }
}

async function getFavsByUserId(id) {
  const response = await fetch(`${serverUrl}/favourites/user/${id}`);

  if (response.status == 200) {
    const favourite = await response.json();
    //console.log(geoJsonData)
    return favourite;
  } else {
    return "error";
  }
}

//function to get coordinates and description for a place name, from the geojson data
function getFeaturesByDescriptionSubstring(substring, data) {
    const features = data.data.features;
    const result = [];
  
    for (let i = 0; i < features.length; i++) {
      const description = features[i].properties.description;

      const strongText = extractString(description)
  
      if (strongText.includes(substring)) {

        console.log(features[i].geometry.coordinates)
        result.push({
          coordinates: features[i].geometry.coordinates,
          description: description
        });
      }
    }
  
    return result;
  }

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function createOpenNavElem() {
  document
    .getElementsByClassName("closebtn")[0]
    .addEventListener("click", closeNav);


  let openNavSpan = document.createElement("span");
  openNavSpan.id = "openNav";
  openNavSpan.innerText = "click here";

  let openNavButton = document.createElement("button")
  openNavButton.id = "openNav";
  openNavButton.className = "openNavButton"

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "36");
  svgElement.setAttribute("height", "36");
  svgElement.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  path1.setAttribute(
    "d",
    "M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z"
    );

  svgElement.appendChild(path1);

  //openNavSpan.appendChild(svgElement);

  openNavButton.appendChild(svgElement);

  //document.body.appendChild(openNavSpan);
  document.body.appendChild(openNavButton)

  openNavButton.addEventListener("click", openNav);

  //openNavSpan.addEventListener("click", openNav);
}

function createFavouritesButton() {

    const favButton = document.createElement("button");
    favButton.className = "button";
    favButton.id = "no";

    const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
   
      const path1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path1.setAttribute(
        "d",
        "M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
      );
  
      svgElement.appendChild(path1);

      favButton.appendChild(svgElement);

      favButton.addEventListener("click", () => {

        const text = favButton.previousElementSibling.innerText
        console.log("from event listener: " + text)

        if (favButton.id === "no") {
            favButton.id = "yes";
            favButton.classList.add("active");
            //call here to add to favourites

            addToFavourites(text)
        } else if (favButton.id === "yes") {
            favButton.id = "no";
            favButton.classList.remove("active");
            //remove from favourites
            removeFavourite(text)
        }
      })

      return favButton;

}

//function to add places buttons based on backend places data
function createPlacesButtons(data) {
  const sideNavDiv = document.getElementById("mySidenav");
  //create children elements based on the data from db

  const features = data.data.features;

  //get the descrption data needed for buttons
  let placeNameArray = [];
  for (let i = 0; i < features.length; i++) {
    placeNameArray.push(extractString(features[i].properties.description));

  }

  for (let i = 0; i < placeNameArray.length; i++) {
    const lineDiv = document.createElement("div");
    lineDiv.className = "align"

    const placeButton = document.createElement("a");
    placeButton.className = "placeButton";
    placeButton.innerText = placeNameArray[i];

    let favButton = createFavouritesButton()

    lineDiv.appendChild(placeButton);
    lineDiv.appendChild(favButton)
    sideNavDiv.appendChild(lineDiv);
  }
}

//call this when page loads - after the buttons are added
//re-enable favourites not working because of fav_id??
async function loadFavourites(userId) {

  let favouriteObj = await getFavsByUserId(userId)

  let favourites_idsArray = favouriteObj.favourite.favourites_ids //this is { user_id; points_id[] }

  console.log(favouriteObj)

  console.log("points_idsArray: " + favourites_idsArray) //array of points_id - THIS IS ACTUALLY points_ids???

  let fav_idArray = []

  for (let i= 0; i < favourites_idsArray.length; i++) {

    const resp1 = await fetch (
      `${serverUrl}/favourites/${favourites_idsArray[i]}`);

    if (resp1.status == 200) {
      const favourite = await resp1.json();
      
      fav_idArray.push(favourite.fav_id)
      console.log( fav_idArray)
      //return fav_idArray;
    } else {
      return "error";
    }
  }

  //update the status of the buttons based on points_id_Array

  for (let i=0; i< favourites_idsArray.length; i++)
  {
    let buttonsArray = document.getElementsByClassName("button")
    for (let j= 0; j < buttonsArray.length; j++)
    {
      //console.log(buttonsArray[j])
      if (favourites_idsArray[i] == j +1) //index starts at 0     
      {
        console.log("got it")
        if (buttonsArray[j].id === "no") {
          buttonsArray[j].id = "yes";
          buttonsArray[j].classList.add("active");
      }

    }

  }

}
}

async function getPointIdFromName(pointName) {

  let idDescr = await getIdDescrObj()

  for (let i=0; i < idDescr.length; i++)
  {

    if (extractString(idDescr[i].description) == pointName)
    {
      console.log("points_id: " + idDescr[i].points_id)
      return idDescr[i].points_id
    } 
  }

}

//on click of favourite place, add it as favourite in the backend (?)
async function addToFavourites(pointName) {

  const options = {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user_id: 1, //HARDCODED - get user id from login??
        points_id: await getPointIdFromName(pointName) //get point id from the name??
    })
  }

  console.log(options)

  const result = await fetch(`${serverUrl}/favourites/`, options)

  if (result.status == 201) {
    console.log("added to favourites");
}

}

async function removeFavourite(pointName) {

  const pointId = await getPointIdFromName(pointName)

  console.log("pointId" + pointId)

  const favouriteId = await getFavIdFromPointId(pointId) //get favId from pointId" 

  console.log(favouriteId.fav_id)

  fetch(`${serverUrl}/favourites/${favouriteId.fav_id}`, {
  method: "DELETE",
})
  .then(response => {
    if (response.ok) {
      console.log("Favourite deleted successfully");
    } else {
      console.error("Failed to delete favourite");
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function extractString(str) {
  const regex = /<strong>(.*?)<\/strong>/; // regular expression to match the string between <strong> tags
  const match = str.match(regex); // execute the regular expression on the input string

  if (match) {
    return match[1]; // return the first capturing group (the string between <strong> tags)
  } else {
    return null; // return null if no match found
  }
}
