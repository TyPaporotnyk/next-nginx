import { FC } from 'react';

import { GlobeIcon } from '@components/.';

import styles from './languageSwitcher.module.scss';

const mapLocaleToLabel: Record<string, string> = {
  ['en-us']: 'en',
  ['uk-ua']: 'укр',
};

export const LanguageSwitcher: FC<components.LanguageSwitcher> = ({ onLangChange, locales = [], locale }) => (
  <div className={styles.selectWrapper}>
    <select onChange={onLangChange} value={locale} className={styles.selectLangContainer}>
      {locales.map((lang: string) => <option key={lang} value={lang}>{mapLocaleToLabel[lang]}</option>)}
    </select>
    <GlobeIcon />
  </div>
);
