import { FC, useEffect, useState } from 'react';
import { GET } from '../../services.ts/api';
import { Tab } from './Tab';
import { Map } from './Map';
import { TabGroup } from './TabGroup/TabGroup';

export interface Address {
  buildingAddress1: string;
  buildingCity: string;
  buildingState: string;
  buildingZip: string;
  appraisedValue: string;
  ownerName: string;
  ownerAddress1: string;
  ownerAddress2?: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  lat: string;
  long: string;
  allOwnedProperties: {
    totalAppraisedValue: number | null;
    propertyCount: number;
  };
}

export const Home: FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [minimumPropertiesToOwn, setMinimumPropertiesToOwn] =
    useState<number>(10);
  const [yearToUse, setYearToUse] = useState<number>(2022);

  useEffect(() => {
    GET<Address[]>(`landlords/${yearToUse}`, {
      minimumProperties: `${minimumPropertiesToOwn}`,
    }).then((response) => {
      setAddresses(response);
    });
  }, [minimumPropertiesToOwn, yearToUse]);
  return (
    <div className="width-100 height-100 position-relative">
      <h1
        className="padding-3 white-space-nowrap margin-0"
        style={{
          position: 'absolute',
          top: 0,
          right: '50%',
          left: '45%',
          width: 'fit-content',
          zIndex: '500',
          whiteSpace: 'nowrap',
          textShadow: '1px 1px 0px white',
        }}
      >
        Who Owns Denver?
      </h1>
      <Map addresses={addresses}></Map>
      <TabGroup tabNames={['Settings', 'About', 'Data']}>
        <Tab>
          <label
            className="margin-bottom-4 flex-row align-items-start"
            htmlFor="year"
          >
            <span className="margin-right-auto">
              Which year would you like to see data from?
            </span>
            <select
              className="margin-left-2"
              id="year"
              value={yearToUse}
              onChange={({ target: { value } }) =>
                setYearToUse(parseInt(value, 10))
              }
            >
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
            </select>
          </label>
          <label
            className="flex-row align-items-start"
            htmlFor="minimum-parcels"
            style={{ gap: '0.5rem' }}
          >
            <span>
              What is the minimum number of parcels a landlord should own to
              show up on this map? WARNING: Selecting below 5 parcels will
              freeze the screen. If you continue to wait it will eventually
              load.
            </span>
            <select
              className="margin-left-2"
              id="minimum-parcels"
              value={minimumPropertiesToOwn}
              onChange={({ target: { value } }) =>
                setMinimumPropertiesToOwn(parseInt(value, 10))
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </label>
        </Tab>
        <Tab>
          <section>
            <h2>What am I looking at?</h2>
            <p>
              This is a map of Denver showing all of the parcels of land that
              are owned by a landlord. I have defined landlord as: someone who
              owns multiple parcels or has LLC in their name or has Trust in
              their name.
            </p>
          </section>
          <section>
            <h2>Why is this data important?</h2>
            <p>
              Housing in Denver continues to become unaffordable for a
              significant number of people. This information helps those who are
              seeking to make Denver more affordable in a couple of different
              ways. <br /> <br />
              For those of you who care about supply and demand, this
              information is useful to know how the existence of landlords
              affects the demand. If we only allowed owner occupied homes in
              Denver then the maximum demand would be equal to the population of
              Denver. As a class, owner occupiers have a maximum demand
              possible. Landlords as a class have an infinite demand, since a
              single landlord can want to own as many properties as possible.
              This level of demand affects the supply which in turn affects
              prices. <br /> <br />
              For those of you who care about policy. This information can be
              used to understand how much of Denver is rented out. I wouldn't
              suggest using this as a perfect representation of the city, but
              you can definitely use this data to get an estimate or at least a
              starting point. You can also use it to determine who the biggest
              landlords in the city are.
            </p>
          </section>
        </Tab>
        <Tab>
          <section>
            <h2>Where did you get this data?</h2>
            <p>
              All of this data is publicly accessible via{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.denvergov.org/opendata/"
              >
                Denver's Open Data Catalog
              </a>
              . I used the{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-parcels"
              >
                Parcels
              </a>{' '}
              data along with the{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-addresses"
              >
                Addresses
              </a>{' '}
              data to group the parcels by owner and then add latitude and
              longitude information.
            </p>
          </section>
          <section>
            <h2>Is this data 100% accurate?</h2>
            <p>
              Definitely not. Some of the parcels shown could be owner occupied,
              but if the owner of that parcel also owns other parcels then all
              of the parcels they own will show here. Not all properties on this
              map are rentals, but all parcels meet my definition of landlord
              owned, according to how I have defined landlords.
            </p>
          </section>
          <section>
            <h2>How can I contact you?</h2>
            <p>
              If you find any issues in the data please feel free to create a
              <a href="https://github.com/vmike245/who-owns-the-homes/issues/new">
                {' '}
                new issue here.
              </a>
              <br />
              If you would like to get in contact with me, you can reach me at{' '}
              <a href="mailto:whoownsdenver@gmail.com">
                WhoOwnsDenver@gmail.com
              </a>
            </p>
          </section>
        </Tab>
      </TabGroup>
    </div>
  );
};
