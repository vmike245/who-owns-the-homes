var mymap = L.map('mapid', { preferCanvas: true }).setView(
  [39.73865208, -104.98546635],
  16
);

const SAME_OWNER_COLOR = '#000000';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const markerLayerGroup = L.layerGroup().addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var governmentEntities = [
  'CITY & COUNTY OF DENVER',
  'UNITED STATES OF AMERICA',
  'STATE OF COLORADO',
  'DENVER SCHOOL FACILITIES LEASING CORPORATION',
  'SCHOOL DISTRICT NO 1',
  'HOUSING AUTHORITY OF THE CITY & COUNTY OF DENVER',
  'DEPARTMENT OF TRANSPORTATION STATE OF COLORADO',
  'REGIONAL TRANSPORTATION DISTRICT',
  'DENVER HOUSING CORPORATION',
  'BOARD OF WATER COMMISSIONERS CITY & COUNTY OF DENVER',
  'STATE OF COLORADO DEPARTMENT OF TRANSPORTATION',
];

var ownersToSkip = [
  'None', // Since this data is parcel data, buildings owned by None are typically apartment buildings. Unfortunately individual owner information would need to be found manually
  ...governmentEntities,
];

const setMarkers = (addressesToMap) => {
  markerLayerGroup.clearLayers();
  addressesToMap.forEach((addressWithInfo, index) => {
    const {
      buildingAddress1,
      lat,
      long,
      ownerName,
      allOwnedProperties,
      appraisedValue,
    } = addressWithInfo;
    if (ownersToSkip.includes(ownerName)) {
      return;
    }
    try {
      const marker = L.circleMarker([parseFloat(lat), parseFloat(long)], {
        radius: 5,
        ...(governmentEntities.includes(ownerName) && {
          color: '#ff0000',
          opacity: 0.5,
        }),
      })
        .addTo(markerLayerGroup)
        .on('click', () => {
          markerLayerGroup.eachLayer((layer) => {
            if (layer.getPopup().getContent().includes(ownerName)) {
              layer.setStyle({ color: SAME_OWNER_COLOR, opacity: 1 });
              layer.bringToFront();
              return;
            }
            layer.setStyle({ color: '#3476f1', opacity: 0.25 });
          });
        });
      marker.bindPopup(
        `${buildingAddress1} <br> <strong>Owned By</strong>: ${ownerName} <br> <strong> Appraised Value</strong>: ${currencyFormatter.format(
          appraisedValue
        )} <br> <strong>All Properties Owned Info</strong>: <br> Count: ${
          allOwnedProperties.propertyCount
        } <br> Total Appraised Value: ${
          currencyFormatter.format(allOwnedProperties.totalAppraisedValue) ||
          currencyFormatter.format(0)
        }`
      );
    } catch (err) {
      console.log(index);
    }
  });
};

const updateMinimum = (value) => {
  const filteredAddresses = addressInfo.filter(
    ({ allOwnedProperties }) => allOwnedProperties.propertyCount >= value
  );
  setMarkers(filteredAddresses);
};

const addLegend = () => {
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = () => {
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML += `<h4 style="margin-top: 0px; margin-bottom: 1rem;"> Legend </h4><div style="display: flex; align-items: center"><span style="border: 3px solid ${SAME_OWNER_COLOR}; width: 16px; height: 16px; border-radius: 8px; display: inline-block; margin-right: 0.5rem"></span> <span>Owned By The Same Person</span></div>`;
    return div;
  };
  legend.addTo(mymap);
};

updateMinimum(document.querySelector('#minimumProperties').value);
addLegend();
