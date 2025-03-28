import { FC } from 'react';

import { PaginationContainer, Section } from '@components/.';

import styles from './partnersSection.module.scss';

export const PartnersSection: FC<components.PartnersSection> = (props) => {
  const {
    title,
    partners,
    sectionBgColor = "#fff",
    sectionTextColor = "#000",
    isTopSection
  } = props;
  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      <div className={styles.contentContainer}>
        <h4>{title}</h4>
        <PaginationContainer items={partners} color="secondary" type="partners" />
      </div>
    </Section>
  );
};
