const socket = io();

const startTracking = document.getElementById('start-tracking');
const stopTracking = document.getElementById('stop-tracking');
const showRoute = document.getElementById('show-route');
const pacMan = document.querySelector('.pac-man');

// getLocation();
// navigator.geolocation.getCurrentPosition((position) => {
//   const { latitude, longitude } = position?.coords;
//   console.log(latitude, longitude);
//   const marker = L.marker([latitude, longitude]).addTo(map);
// });

const map = L.map('map').setView([27.9604245, -82.4420817], 13);

let setLocation = null;

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    // attribution:
    //   'Some info below the map',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoidXRpbGl6YXRlciIsImEiOiJja3pxNzhvMXQwYmxoMzFtemR4NGFlODRpIn0.Pec5kJfFLyQtITbXQ9wVEg',
  }
).addTo(map);

// L.Routing.Itinerary({
//   show: false,
// });

console.log(L.Routing);

startTracking.addEventListener('click', () => {
  pacMan.style.display = 'block';
  setLocation = setInterval(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      socket.emit('sendLocation', { latitude, longitude });
    });
  }, 5000);
});

stopTracking.addEventListener('click', () => {
  pacMan.style.display = 'none';
  clearInterval(setLocation);
  setLocation = null;
});

// document.querySelector('.leaflet-routing-alt').style.display = 'none';

showRoute.addEventListener('click', async () => {
  const routeDate = await axios.get('http://localhost:3000/route');
  console.log(routeDate?.data);
  const waypoints = (routeDate?.data ?? []).map((el) => {
    const [lat, lon] = el.split(':');
    return L.latLng(+lat, +lon);
  });
  L.Routing.control({
    // waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    waypoints,
    // show: false,
    // addWaypoints: false,
    // draggableWaypoints: false,
    // fitSelectedRoutes: false,
  }).addTo(map);
});
