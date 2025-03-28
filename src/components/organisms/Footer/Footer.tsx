import { FC } from 'react';
import Link from 'next/link';

import { FBIcon, InstaIcon, LinkWithArrow } from '@components/.';

import styles from './footer.module.scss';

export const Footer: FC<components.Footer> = ({ logo, navigationLinks, typesOfHelpLinks, socialLinks, copyright }) => {
  return (
    <footer className={styles.footerOuterContainer}>
      <div className={styles.footerInnerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.url} alt={logo.title} />
          </Link>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.activitiesLinkContainer}>
            {typesOfHelpLinks.map(({ title, href }) => (
              <LinkWithArrow key={title} href={href} label={title} className={styles.activityLink} />
            ))}
          </div>
          <nav className={styles.navContainer}>
            {navigationLinks.map(({ title, href }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {title.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.socialLinksAndPoliciesContainer}>
          <div className={styles.socialIconsContainer}>
            {socialLinks.map(({ title, href }) => (
              <Link key={title} href={href} className={styles.socialLink}>
                {title === 'facebook' ? <FBIcon /> : <InstaIcon />}
              </Link>
            ))}
          </div>
          <div className={styles.copyright}>{copyright}</div>
        </div>
      </div>
    </footer>
  );
};
