import { FC } from 'react';

import { Button, Section } from '@components/.';

import styles from './supportUsSection.module.scss';
import { useRouter } from 'next/router';

export const SupportUsSection: FC<components.SupportUsSection> = (props) => {
  const { title, actionLink, sectionBgColor, sectionTextColor } = props;
  const router = useRouter();

  const actionButtonClick = (): void => {
    router.push(actionLink?.href || '/');
  };

  return (
    <div className={styles.extraWrapper}>
      <Section textColor={sectionTextColor} bgColor={sectionBgColor} className={styles.supportUsSection}>
        <div className={styles.contentContainer}>
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          <Button onClick={actionButtonClick} text={actionLink?.title} />
        </div>
      </Section>
    </div>
  );
};
