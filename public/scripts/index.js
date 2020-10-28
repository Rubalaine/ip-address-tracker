import "@babel/polyfill";
import axios from "axios";
const search = document.getElementById("search");
// import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VsdmVuLXJ1YmFsYWluZSIsImEiOiJja2d0MnB3aHowNnRlMnpxcmdkMzM1aWhyIn0.gcDLP6xN4goZ2NPmMOPbVw";
const searchIp = async (ipAddress = "") => {
  try {
    const ipInfo = await axios({
      method: "GET",
      url: "https://geo.ipify.org/api/v1",
      params: {
        apiKey: "at_IeYjRBoCXMB0FCquWAX7Jv8zzzNHg",
        ipAddress: ipAddress,
      },
    });
    return ipInfo.data;
  } catch (error) {
    console.error("erro ao pesquisar pelo IP");
  }
};
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/kelven-rubalaine/ckgt35vt61rxy19p5hdd4m3u0", // stylesheet location
  center: [-122.078514, 45.40599], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

// searchIp()
//   .then((ip) => {
//     map.center;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
document.body.addEventListener("load", async (event) => {
  event.preventDefault();
  const { location } = await searchIp();
});

if (search)
  search.addEventListener("click", async (event) => {
    event.preventDefault();
    const searchText = document.getElementById("search-text").value;
    const ip = await searchIp(searchText);
    changeData(ip);
    const location = [ip.location.lng, ip.location.lat];
    map.flyTo({ center: location, speed: 2 });
    const marker = new mapboxgl.Marker().setLngLat(location);
    marker.addTo(map);
    console.log(JSON.stringify(ip, null, 2));
  });

const changeData = (address) => {
  //   map.flyTo({ center: [address.location.lng, address.location.lat] });
  document.getElementById("address").innerText = address.ip;
  document.getElementById(
    "location"
  ).innerText = `${address.location.region}, ${address.location.city} ${address.location.postalCode}`;
  document.getElementById("timezone").innerText = address.location.timezone;
  document.getElementById("isp").innerText = address.isp;
};
//?apiKey=at_IeYjRBoCXMB0FCquWAX7Jv8zzzNHg&ipAddress=8.8.8.8
