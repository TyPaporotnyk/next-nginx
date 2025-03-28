import { FC } from 'react';

import styles from './pageNotFoundContent.module.scss';
import { Error404Icon } from '@components/icons';

export const PageNotFoundContent: FC<components.PageNotFoundContent> = (props) => {
  const { title, subTitle } = props;

  return (
    <div className={styles.container}>
      <Error404Icon />
      <h4>{title}</h4>
      <p>{subTitle}</p>
    </div>
  );
};
