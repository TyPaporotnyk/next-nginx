import { usePathname } from 'next/navigation';
import { RenderComponents } from '@components/organisms/RenderComponents';
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { jsonDataManager } from '@headless/.';

import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/router';
import { IntlContext } from '@contexts/IntlContext';
import { PageData } from '@components/molecules';
import { Footer, Header } from '@components/organisms';

export default function Home({ page, footer: footerInit, header: headerInit }: pages.PageProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useContext(IntlContext);
  const [pageContent, setPageContent] = useState(() =>
    !pathname || page?.url === pathname ? { page, header: headerInit, footer: footerInit } : null,
  );
  const { page: { pageComponents, title } = {} as any, header, footer } = pageContent || {};

  useEffect(() => {
    if (pathname !== '/') {
      router.replace(pathname);
    } else {
      const { getHeaderData, getFooterData, getPageData } = jsonDataManager;
      Promise.all([getHeaderData(locale), getFooterData(locale), getPageData('/', locale)])
        .then((response) =>
          setPageContent({ header: response[0], footer: response[1], page: response[2] } as pages.PageProps),
        )
        .catch(() => router.replace('/404'));
    }
  }, [locale, pathname]);

  useEffect(() => {
    setTimeout(() => document.body.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }, [pathname]);

  return (
    <>
      <PageData title={title} />
      {header && <Header {...header} />}
      {pageComponents ? <RenderComponents pageComponents={pageComponents} locale={locale} /> : <Skeleton height={800} width="100%" />}
      {footer && <Footer {...footer} />}
    </>
  );
}

export async function getStaticProps(context: pages.Context) {
  try {
    const pageRes = await jsonDataManager.getPageData('/', 'uk-ua');
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
