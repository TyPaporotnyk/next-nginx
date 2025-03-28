import { FC } from 'react';
import Link from 'next/link';

import { Section } from '@components/.';

import styles from './askForHelpInfoSection.module.scss';

export const AskForHelpInfoSection: FC<components.AskForHelpInfoSection> = (props) => {
  const {  description, sectionBgColor, sectionTextColor, isTopSection } = props;

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
    </Section>
  );
};
