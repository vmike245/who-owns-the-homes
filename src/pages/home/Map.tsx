import { FC, memo } from 'react';
import { MapContainer, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import { Address } from './Home';

// const SAME_OWNER_COLOR = '#000000';

interface Props {
  addresses: Address[];
}

const governmentEntities = [
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

const ownersToSkip = [
  'None', // Since this data is parcel data, buildings owned by None are typically apartment buildings. Unfortunately individual owner information would need to be found manually
  ...governmentEntities,
];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const addressesComparison = (previousProps: Props, nextProps: Props) => {
  return (
    previousProps?.addresses.length === nextProps?.addresses.length //&&
  );
};

export const Map: FC<Props> = memo(({ addresses }) => {
  const addressesToShow = addresses.filter(({ ownerName }) => {
    return !ownersToSkip.includes(ownerName);
  });
  return (
    <MapContainer
      center={[39.73865208, -104.98546635]}
      zoom={16}
      preferCanvas={true}
      style={{ height: '100vh' }}
      className="zIndex-1"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {addressesToShow.map(
        (
          {
            buildingAddress1,
            ownerName,
            appraisedValue,
            allOwnedProperties,
            lat,
            long,
          },
          index
        ) => {
          return (
            <CircleMarker
              center={[parseFloat(lat), parseFloat(long)]}
              key={`${index}`}
              radius={5}
            >
              <Popup>
                <span>
                  {buildingAddress1}
                  <br />
                  <span>
                    <strong>Owned By</strong>: {ownerName}
                  </span>
                  <br />
                  <span>
                    <strong> Appraised Value</strong>:{' '}
                    {parseInt(appraisedValue, 10)}
                  </span>
                  <br />
                  <span>
                    <strong>All Properties Owned Info</strong>:
                  </span>
                  <br />
                  <span>Count: {allOwnedProperties.propertyCount} </span>
                  <br />
                  <span>
                    Total Appraised Value:{' '}
                    {currencyFormatter.format(
                      allOwnedProperties.totalAppraisedValue ?? 0
                    ) || currencyFormatter.format(0)}
                  </span>
                </span>
              </Popup>
            </CircleMarker>
          );
        }
      )}
    </MapContainer>
  );
}, addressesComparison);
