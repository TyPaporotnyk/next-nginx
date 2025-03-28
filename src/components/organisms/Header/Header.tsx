import { FC, ChangeEvent, useState, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import classNames from 'classnames';

import { Button, CloseMenuIcon, LanguageSwitcher, MenuIcon } from '@components/.';

import styles from './header.module.scss';
import { IntlContext } from '@contexts/IntlContext';
import { useRouter } from 'next/router';

export const Header: FC<components.Header> = ({ logo, navigationLinks = [], locales, callToAction }) => {
  const { locale, changeLang } = useContext(IntlContext);
  const router = useRouter();
  const pathname = usePathname();
  const [openedMenu, setOpenedMenu] = useState(false);

  const closeMenu = (): void => {
    openedMenu && setOpenedMenu(false);
  };

  const onLangChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const locale = event.target.value;
    changeLang(locale);
    closeMenu();
  };

  const navContent = (
    <>
      <nav className={styles.navContainer}>
        {navigationLinks.map(({ title, href }) => (
          <Link
            onClick={closeMenu}
            key={href}
            href={href}
            className={classNames(styles.navLink, { [styles.selectedLink]: href === pathname })}
          >
            {title}
          </Link>
        ))}
      </nav>
      <LanguageSwitcher locales={locales} onLangChange={onLangChange} locale={locale} />
      <Button type="header" text={callToAction.title} onClick={() => router.push(callToAction.href)} />
    </>
  );

  return (
    <header className={styles.headerOuterContainer}>
      <div className={styles.headerInnerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.url} alt={logo.title} />
          </Link>
        </div>
        <div className={styles.inHeaderBarView}>{navContent}</div>
        <button onClick={() => setOpenedMenu(true)} className={styles.menuButton}>
          <MenuIcon />
        </button>
      </div>
      <div
        onClick={() => setOpenedMenu(false)}
        className={classNames(styles.sideBarBg, { [styles.visibleSideBarBg]: openedMenu })}
      />
      <div className={classNames(styles.sideBarMenu, { [styles.visibleSideBarMenu]: openedMenu })}>
        <button onClick={closeMenu} className={styles.closeMenuButton}>
          <CloseMenuIcon />
        </button>
        {navContent}
      </div>
    </header>
  );
};
