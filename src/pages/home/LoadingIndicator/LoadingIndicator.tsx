import { FC } from 'react';
import styles from './LoadingIndicator.module.css';
import apartmentBuilding from './icons/apartment-building.png';
import home from './icons/home.png';
import multifamilyHome from './icons/multifamily-home.png';

interface Props {}

const iconOptions = [apartmentBuilding, home, multifamilyHome];

export const LoadingIndicator: FC<Props> = () => {
  const imageIndex = Math.floor(Math.random() * 3);
  return (
    <div
      className={`width-100 height-100 background-white zIndex-3 ${styles.overlay}`}
    >
      <div
        className={`${styles.loading}`}
        style={{ backgroundImage: `url(${iconOptions[imageIndex]}` }}
      ></div>
    </div>
  );
};
