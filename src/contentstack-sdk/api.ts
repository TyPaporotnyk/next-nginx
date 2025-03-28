import { getEntry, getEntryByUrl } from '.';

export const HOME_PAGE_UID = 'demo_home_page';
export const PAGE_UID = 'demo_page';


export const getHeaderRes = async (locale?: string): Promise<contentTypes.HeaderProps> => {
  const response = (await getEntry({
    contentTypeUid: 'header_demo',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    locale,
  })) as contentTypes.HeaderProps[][];

  return response[0][0];
};

export const getFooterRes = async (locale?: string): Promise<contentTypes.FooterProps> => {
  const response = (await getEntry({
    contentTypeUid: 'footer_demo',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    locale,
  })) as contentTypes.FooterProps[][];

  return response[0][0];
};

export const getAllEntries = async (locale?: string): Promise<contentTypes.Page[]> => {
  const response = (await getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    locale,
  })) as contentTypes.Page[][];

  return response[0];
};

export const getPageRes = async (entryUrl: string, uid: string, locale?: string): Promise<contentTypes.Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: uid,
    entryUrl,
    referenceFieldPath: [
      'page_components.section_with_posts.posts',
      'page_components.support_us',
    ],
    jsonRtePath: [
      'page_components.section_with_posts.posts.description',
    ],
    locale,
  })) as contentTypes.Page[];

  return response[0];
};
