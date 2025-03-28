import { FC } from 'react';
import Head from 'next/head';

export const PageData: FC<components.PageData> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content="Mriya foundation" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
