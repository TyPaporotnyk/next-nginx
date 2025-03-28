import { PageData } from '@components/molecules';
import { Footer, Header, RenderComponents } from '@components/organisms';
import { IntlContext } from '@contexts/IntlContext';
import { jsonDataManager } from '@headless/json';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Page({ page, header: headerInit, footer: footerInit }: pages.PageProps) {
  const pathname = usePathname();
  const { locale } = useContext(IntlContext);
  const [pageContent, setPageContent] = useState(() =>
    !pathname || page?.url === pathname ? { page, header: headerInit, footer: footerInit } : null,
  );
  const { page: { pageComponents, title, showTitle } = {} as any, header, footer } = pageContent || {};

  useEffect(() => {
    const { getHeaderData, getFooterData, getPageData } = jsonDataManager;
    Promise.all([getHeaderData(locale), getFooterData(locale), getPageData('/404', locale)])
      .then((response) =>
        setPageContent({ header: response[0], footer: response[1], page: response[2] } as pages.PageProps),
      )
      .catch(() => console.error('/404 data error'));
  }, [locale, pathname]);

  return (
    <>
      <PageData title={title} />
      {header && <Header {...header} />}
      {pageComponents ? <RenderComponents pageComponents={pageComponents} locale={locale} /> : <Skeleton height={800} width="100%" />}
      {footer && <Footer {...footer} />}
    </>
  );
}

export async function getStaticProps() {
  try {
    const pageRes = await jsonDataManager.getPageData('/404', 'uk-ua');
    const header = await jsonDataManager.getHeaderData('uk-ua');
    const footer = await jsonDataManager.getFooterData('uk-ua');

    return {
      props: {
        page: pageRes,
        header,
        footer,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
