import { FC } from 'react';

import classNames from 'classnames';

import styles from './button.module.scss';

export const Button: FC<components.Button> = ({ text, type = 'regular', onClick = () => {}, className }) => (
  <button onClick={onClick} className={classNames(styles.button, className, { [styles[`${type}Button`]]: !!type })}>
    {text}
  </button>
);
