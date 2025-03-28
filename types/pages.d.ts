declare namespace pages {
  interface PageProps {
    page: Page;
    entryUrl: string;
    Component: any;
    entries: Entry;
    pageProps: PageProps;
    header: HeaderProps;
    footer: FooterProps;
    locale: string;
  }
  
  interface Context {
    resolvedUrl: string;
    setHeader: Function;
    write: Function;
    end: Function;
  }
}
