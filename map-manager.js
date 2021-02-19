// import { addressInfo } from './addresses-with-info.js';

var mymap = L.map('mapid', { preferCanvas: true }).setView(
  [39.7348, -104.9653],
  13
);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

console.log(addressInfo);
addressInfo.forEach((addressWithInfo) => {
  const { address, lat, long, ownerName, allOwnedProperties } = addressWithInfo;
  try {
    const marker = L.marker([parseFloat(lat), parseFloat(long)]).addTo(mymap);
    marker.bindPopup(
      `${address} <br> <strong>Owned By</strong>: ${ownerName} <br> <strong>All Properties Owned</strong>: <br>${allOwnedProperties.length}`
    );
  } catch (err) {
    console.log(addressWithInfo);
  }
});
