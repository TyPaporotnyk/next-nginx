declare namespace headless {
  interface DataServiceManager {
    getHeaderData: (locale?: string) => Promise<components.Header>;
    getFooterData: (locale?: string) => Promise<components.Footer>;
    getPageData: (url: string, locale?: string) => Promise<components.Page>;
    getAllPagesData: (locale?: string) => Promise<components.Page[]>;
  }
}
