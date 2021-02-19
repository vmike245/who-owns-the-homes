// import { addressInfo } from './addresses-with-info.js';

var mymap = L.map('mapid', { preferCanvas: true }).setView(
  [39.73865208, -104.98546635],
  16
);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var governmentEntities = ['CITY & COUNTY OF DENVER'];

addressInfo.forEach((addressWithInfo, index) => {
  const { address, lat, long, ownerName, allOwnedProperties } = addressWithInfo;
  try {
    const marker = L.circleMarker([parseFloat(lat), parseFloat(long)], {
      radius: 5,
      ...(governmentEntities.includes(ownerName) && {
        color: '#ff0000',
        opacity: 0.5,
      }),
    }).addTo(mymap);
    marker.bindPopup(
      `${address} <br> <strong>Owned By</strong>: ${ownerName} <br> <strong>All Properties Owned</strong>: <br>${
        allOwnedProperties.length > 10
          ? allOwnedProperties.length
          : allOwnedProperties.join(', ')
      }`
    );
  } catch (err) {
    console.log(index);
  }
});
