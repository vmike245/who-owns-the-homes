// import { addressInfo } from './addresses-with-info.js';

var mymap = L.map('mapid').setView([39.7348, -104.9653], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

console.log(addressInfo);
addressInfo.forEach(({ address, lat, long, ownerName, allOwnedProperties }) => {
  const marker = L.marker([lat, long]).addTo(mymap);
  marker.bindPopup(
    `${address} <br> Owned By: ${ownerName} <br> All Properties Owned: ${allOwnedProperties.join(
      '<br>'
    )}`
  );
});
