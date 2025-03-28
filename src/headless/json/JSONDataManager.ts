// uk-ua data
import uaHeader from './jsonData/uk-ua/header.json';
import uaFooter from './jsonData/uk-ua/footer.json';
import uaPages from './jsonData/uk-ua/pages.json';
import uaPosts from './jsonData/uk-ua/posts.json';
import uaPartners from './jsonData/uk-ua/partners.json';
import uaActivities from './jsonData/uk-ua/activities.json';
import uaContacts from './jsonData/uk-ua/contacts.json';

// en-us data
import enHeader from './jsonData/en-us/header.json';
import enFooter from './jsonData/en-us/footer.json';
import enPages from './jsonData/en-us/pages.json';
import enPosts from './jsonData/en-us/posts.json';
import enPartners from './jsonData/en-us/partners.json';
import enActivities from './jsonData/en-us/activities.json';
import enContacts from './jsonData/en-us/contacts.json';

import { COMPONENTS_WITH_REFERENCES } from './constants';

class JSONDataManager implements headless.DataServiceManager {
  public getHeaderData = async (locale?: string): Promise<components.Header> => {
    return locale === 'uk-ua' ? uaHeader : enHeader;
  };

  public getFooterData = async (locale?: string): Promise<components.Footer> => {
    return locale === 'uk-ua' ? uaFooter : enFooter;
  };

  public getPageData = async (url: string, locale?: string): Promise<components.Page> => {
    const allPages = (locale === 'uk-ua' ? uaPages : enPages) as components.Page[];
    const page = allPages.find((page) => page.url === url);

    return this.getPageWithPosts(page, locale);
  };

  public getAllPagesData = async (locale?: string): Promise<components.Page[]> => {
    const allPages = (locale === 'uk-ua' ? uaPages : enPages) as components.Page[];

    return allPages.map((page) => this.getPageWithPosts(page, locale));
  };

  private getPageWithPosts = (page?: components.Page, locale?: string): components.Page => {
    if (!page) {
      throw new Error('404');
    }

    return {
      ...page,
      pageComponents: page.pageComponents.map((component) =>
        COMPONENTS_WITH_REFERENCES.includes(component.uid) ? this.normalizeComponentRefs(component, locale) : component,
      ),
    };
  };

  private normalizeComponentRefs = (
    component: components.DynamicComponent,
    locale?: string,
  ): components.DynamicComponent => {
    const allPosts = (locale === 'uk-ua' ? uaPosts : enPosts) as any;
    const allPartners = (locale === 'uk-ua' ? uaPartners : enPartners) as any;
    const allActivities = (locale === 'uk-ua' ? uaActivities : enActivities) as any;
    const allContacts = (locale === 'uk-ua' ? uaContacts : enContacts) as any;

    if (component.props.posts) {
      return {
        ...component,
        props: {
          ...component.props,
          posts: component.props.posts.map((ref: string) => allPosts.find(({ uid }: components.Post) => uid === ref)),
        },
      };
    } else if (component.props.partners) {
      return {
        ...component,
        props: {
          ...component.props,
          partners: component.props.partners.map((ref: string) =>
            allPartners.find(({ uid }: components.Partner) => uid === ref),
          ),
        },
      };
    } else if (component.props.contactsList) {
      return {
        ...component,
        props: {
          ...component.props,
          contactsList: component.props.contactsList.map((ref: string) =>
            allContacts.find(({ uid }: components.Contact) => uid === ref),
          ),
        },
      };
    } else if (component.props.activities) {
      return {
        ...component,
        props: {
          ...component.props,
          activities: component.props.activities.map((ref: string) =>
            allActivities.find(({ uid }: components.Partner) => uid === ref),
          ),
        },
      };
    } else if (component.props.post) {
      return {
        ...component,
        props: {
          ...component.props,
          post: allPosts.find(({ uid }: components.Post) => uid === component.props.post),
        },
      };
    }

    return component;
  };
}

export const jsonDataManager = new JSONDataManager();
