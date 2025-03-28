import { FC } from 'react';

export const MenuIcon: FC<components.SvgIcon> = ({ height = 34, width = 34, className = '' }) => (
  <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 34 34" className={className} fill="none">
    <rect x="9" y="10" width="16" height="1.88461" rx="0.942307" fill="#404040" />
    <rect x="9" y="15.8846" width="16" height="1.88461" rx="0.942307" fill="#404040" />
    <rect x="9" y="21.7692" width="16" height="1.88461" rx="0.942307" fill="#404040" />
    <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" stroke="#404040" />
  </svg>
);
