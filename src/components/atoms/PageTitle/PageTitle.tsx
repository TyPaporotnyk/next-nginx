import { FC } from 'react';

import styles from './pageTitle.module.scss';

export const PageTitle: FC<components.PageTitle> = ({ title }) => (
  <div className={styles.titleContainer}>
    <h4 dangerouslySetInnerHTML={{ __html: title }} />
  </div>
);
