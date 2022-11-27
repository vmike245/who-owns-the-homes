import { FC, useState } from 'react';
import styles from './TabGroup.module.css';

interface Props {
  tabNames: string[];
  children: JSX.Element[];
}

const TAB_OPACITY = '0.8';
const TAB_COLORS = [
  `rgba(0, 128, 26, ${TAB_OPACITY})`,
  `rgba(255, 0, 0, ${TAB_OPACITY})`,
  `rgba(4, 169, 196, ${TAB_OPACITY})`,
];

export const TabGroup: FC<Props> = ({ tabNames, children }) => {
  const [indexOfTabDisplaying, setIndexOfTabDisplaying] = useState<number>(0);
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0px',
        width: 'min(90%, 500px)',
      }}
      className="zIndex-1"
    >
      <div className="flex-row">
        {tabNames.map((tabName, index) => {
          return (
            <button
              key={index}
              className={`padding-x-4 padding-y-2 text-white ${styles.tab}`}
              type="button"
              onClick={() => {
                if (index === indexOfTabDisplaying) {
                  setIndexOfTabDisplaying(-1);
                  return;
                }
                setIndexOfTabDisplaying(index);
              }}
              style={{
                background: TAB_COLORS[index],
              }}
            >
              {tabName}
            </button>
          );
        })}
      </div>
      {children.map((child, index) => {
        const isTabShowing = indexOfTabDisplaying === index;
        return (
          <div
            key={index}
            style={{
              transition: 'height 0.4s ease',
              height: isTabShowing ? '500px' : '0px',
              overflow: 'hidden',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
