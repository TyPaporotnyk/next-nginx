import { FC } from 'react';

import { Button, Section } from '@components/.';

import styles from './paymentsDetailsInfo.module.scss';
import { useRouter } from 'next/router';

export const PaymentsDetailsInfo: FC<components.PaymentsDetailsInfo> = (props) => {
  const { sectionBgColor, sectionTextColor, isTopSection, dataBlocks } = props;
  const router = useRouter();

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      <div className={styles.wrapper}>
        {dataBlocks?.map(({ blockTitle, data }, index) => (
          <div key={`${blockTitle}${index}`} className={styles.infoBlock}>
            {blockTitle && <div className={styles.blockTitle}>{blockTitle}</div>}
            {data?.map((item: any, index: number) => {
              if (item === 'br') {
                return <div key={index} className={styles.spaceBlock} />;
              } else if (item.description || item.title) {
                const { title, description } = item;
                return (
                  <div key={index} className={styles.infoField}>
                    {title && <strong>{title} </strong>}
                    {description}
                  </div>
                );
              } else if (item.href) {
                return (
                  <a key={index} href={item.href} target="_blank">
                    {item.label}
                  </a>
                );
              } else if (item.buttonHref) {
                return (
                  <Button
                    key={item.buttonHref}
                    onClick={() => router.push(item.buttonHref)}
                    type="regular"
                    text={item.label}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
    </Section>
  );
};
