import { FC } from 'react';

interface Props {
  children: any;
}

export const Tab: FC<Props> = ({ children }) => {
  return (
    <div className="padding-4 background-white height-100 overflow-auto">
      {children}
    </div>
  );
};
