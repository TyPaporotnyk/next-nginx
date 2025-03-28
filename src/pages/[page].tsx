import { RenderComponents } from '@components/organisms/RenderComponents';
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { usePathname, useSearchParams } from 'next/navigation';
import 'react-loading-skeleton/dist/skeleton.css';

import { jsonDataManager } from '@headless/.';
import { useRouter } from 'next/router';
import { PageTitle } from '@components/atoms';
import { IntlContext } from '@contexts/IntlContext';
import { PageData } from '@components/molecules';
import { Footer, Header } from '@components/organisms';

export default function Page({ page, header: headerInit, footer: footerInit }: pages.PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useContext(IntlContext);
  const [pageContent, setPageContent] = useState(() =>
    !pathname || page?.url === pathname ? { page, header: headerInit, footer: footerInit } : null,
  );
  const { page: { pageComponents, title, showTitle } = {} as any, header, footer } = pageContent || {};

  useEffect(() => {
    const { getHeaderData, getFooterData, getPageData } = jsonDataManager;
    Promise.all([getHeaderData(locale), getFooterData(locale), getPageData(pathname, locale)])
      .then((response) =>
        setPageContent({ header: response[0], footer: response[1], page: response[2] } as pages.PageProps),
      )
      .catch(() => router.replace('/404'));
  }, [locale, pathname]);

  useEffect(() => {
    const anchor = searchParams.get('anchor');

    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.parentElement?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <>
      <PageData title={title} />
      {header && <Header {...header} />}
      {showTitle && <PageTitle title={title} />}
      {pageComponents ? <RenderComponents pageComponents={pageComponents} locale={locale} /> : <Skeleton height={800} width="100%" />}
      {footer && <Footer {...footer} />}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['/about-us', '/news', '/banner', '/types-of-help', "/ask-for-help", '/contacts', '/support-us'],
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  try {
    const entryUrl = params.page.includes('/') ? params.page : `/${params.page}`;
    const pageRes = await jsonDataManager.getPageData(entryUrl, 'uk-ua');
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
