import { FC } from 'react';

import { PaginationContainer, Section } from '@components/.';

import styles from './areasOfActivitySection.module.scss';

export const AreasOfActivitySection: FC<components.AreasOfActivitySection> = (props) => {
  const { title, activities, sectionBgColor, sectionTextColor, isTopSection } = props;

  return (
    <div className={styles.extraWrapper}>
      <Section
        bgColor={sectionBgColor}
        textColor={sectionTextColor}
        isFirstSection={isTopSection}
        className={styles.activitiesSection}
      >
        <div className={styles.contentContainer}>
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          <PaginationContainer items={activities} color="primary" type="activities" />
        </div>
      </Section>
    </div>
  );
};
