import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import classNames from 'classnames';

import { Button, NextIcon } from '@components/.';

import styles from './heroBannerSection.module.scss';
import Link from 'next/link';

export const HeroBannerSection: FC<components.HeroBannerSection> = (props) => {
  const { posts, callToAction } = props;
  const router = useRouter();
  const [slidesOrder, setSlidesOrder] = useState(() => posts.map((_, index) => index));

  const showNextSlide = (): void => {
    const lastSlide = slidesOrder[slidesOrder.length - 1];
    const newOrder = [lastSlide, ...slidesOrder.slice(0, slidesOrder.length - 1)];
    setSlidesOrder(newOrder);
  };

  return (
    <section className={styles.heroBannerSection}>
      <div className={styles.heroBannerContainer}>
        {posts.map(({ title, subTitle, bannerPicture, bannerPlaceholder, uid }, index) => (
          <Link
            href={`${callToAction.href}?uid=${uid}`}
            key={uid}
            className={classNames(styles.slideItem, { [styles[`slide${slidesOrder[index]}`]]: true })}
          >
            <div className={styles.slideContent}>
              <h1>{title}</h1>
              {subTitle && <p>{subTitle}</p>}
              <Button
                onClick={() => router.push(`${callToAction.href}?uid=${uid}`)}
                type="large"
                text={callToAction.title}
              />
            </div>
            {bannerPicture?.url && (
              <Image
                src={bannerPicture.url}
                width={1440}
                height={800}
                style={{ height: '100%', objectFit: 'cover' }}
                alt={bannerPicture.title}
                title={bannerPicture.title}
                priority={1 === index}
                placeholder={bannerPlaceholder ? 'blur' : 'empty'}
                blurDataURL={bannerPlaceholder}
              />
            )}
          </Link>
        ))}
        <button className={styles.nextButton} onClick={showNextSlide}>
          <NextIcon />
        </button>
      </div>
    </section>
  );
};
