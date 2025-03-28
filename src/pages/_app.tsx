import type { AppProps } from 'next/app';
import { IntlContextProvider } from '@contexts/IntlContext';

import '@styles/globals.css';
import '@styles/scss/_general.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlContextProvider>
      <Component {...pageProps} />
    </IntlContextProvider>
  );
}
