import { FC, createContext, useState } from 'react';

export const IntlContext = createContext<contexts.IntlContext>({} as any);

export const IntlContextProvider: FC<contexts.IntlContextProvider> = ({ children }) => {
  const [locale, setLocale] = useState('uk-ua');

  const changeLang = (lang: string): void => {
    setLocale(lang);
  };

  return <IntlContext.Provider value={{ locale, changeLang }}>{children}</IntlContext.Provider>;
};
