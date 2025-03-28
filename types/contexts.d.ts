declare namespace contexts {
  interface IntlContextProvider {
    children: React.ReactNode;
  }

  interface IntlContext {
    locale: string;
    changeLang: (lang: string) => void;
  }
}
