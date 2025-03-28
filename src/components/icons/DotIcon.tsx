import { FC } from 'react';

export const DotIcon: FC<components.SvgIcon> = ({ height = 8, width = 8, className = '' }) => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 8 8" className={className}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
};
