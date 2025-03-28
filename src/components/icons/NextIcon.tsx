import { FC } from 'react';

export const NextIcon: FC<components.SvgIcon> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 92 92" className={className} fill="none">
      <g filter="url(#filter0_b_794_1170)">
        <circle cx="46" cy="46" r="46" fill="white" fillOpacity="0.24" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.8914 63.2935L63.3616 47.6767C64.2128 46.7602 64.2128 45.242 63.3618 44.3235L48.8914 28.7065C48.0186 27.7645 46.6338 27.7645 45.761 28.7065L45.5878 28.9177L45.4449 29.1418C44.9261 30.0644 45.0413 31.2808 45.754 32.0769L56.4719 43.6202L28.2205 43.617C26.9991 43.617 26 44.6953 26 46.0133L26.0122 46.2612L26.0509 46.5159C26.2714 47.5976 27.1657 48.3845 28.2205 48.3845L56.4719 48.386L45.761 59.9405C44.91 60.8569 44.91 62.3751 45.761 63.2935C46.6338 64.2355 48.0186 64.2355 48.8914 63.2935Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_794_1170"
          x="-20"
          y="-20"
          width="132"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_794_1170" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_794_1170" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
