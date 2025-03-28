import { FC } from 'react';

import classNames from 'classnames';

import styles from './section.module.scss';

export const Section: FC<components.Section> = ({ children, bgColor, textColor, isFirstSection = false, className }) => (
  <section
    style={{
      color: textColor,
      backgroundColor: bgColor,
    }}
    className={styles.sectionWrapper}
  >
    <div className={classNames(styles.sectionContainer, className, { [styles.isFirstSection]: isFirstSection })}>{children}</div>
  </section>
);
