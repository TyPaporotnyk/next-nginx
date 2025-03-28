import { FC } from 'react';
import Link from 'next/link';

import classNames from 'classnames';

import { ArrowIcon } from '@components/icons';

import styles from './linkWithArrow.module.scss';

export const LinkWithArrow: FC<components.LinkWithArrow> = ({ href, label, className }) => (
  <div className={classNames(styles.linkContainer, className)}>
    <ArrowIcon />
    <Link href={href}>{label}</Link>
  </div>
);
