import { FC, TouchEventHandler, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';

import styles from './paginationContainer.module.scss';
import {
  DotIcon,
  EducationalSupportIcon,
  HumanitarianHelpIcon,
  LawSupportIcon,
  PeacefulSummerIcon,
} from '@components/icons';
import { Button } from '../../atoms/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useWindowTargetManager } from '@hooks/.';
import { useRouter } from 'next/router';

const pageNumbersByTypeAndTarget: Record<'activities' | 'partners', Record<string, number>> = {
  activities: {
    mobile: 4,
    tablet: 2,
    desktop: 2,
    desktop_wide: 0,
  },
  partners: {
    mobile: 5,
    tablet: 4,
    desktop: 4,
    desktop_wide: 4,
  },
};
const getPartnerLogoSizeByTarget: Record<string, number[]> = {
  mobile: [67, 35],
  tablet: [97, 51],
  desktop: [134, 70],
  desktop_wide: [134, 70],
};

const renderIconByType = (type: string) => {
  switch (type) {
    case 'law':
      return <LawSupportIcon key="law" className={styles.activityIcon} />;
    case 'humanitarian':
      return <HumanitarianHelpIcon key="humanitarian" className={styles.activityIcon} />;
    case 'education':
      return <EducationalSupportIcon key="education" className={styles.activityIcon} />;
    case 'summer':
      return <PeacefulSummerIcon key="summer" className={styles.activityIcon} />;
    default:
      return null;
  }
};

export const PaginationContainer: FC<components.PaginationContainer> = ({
  items = [],
  color = 'primary',
  type = 'activities',
}) => {
  const router = useRouter();
  const selectedClass = useMemo(() => styles[`${color}Selected`], [color]);
  const isActivitiesList = type === 'activities';
  const [touchStart, setTouchStart] = useState<null | number>(null);
  const [touchEnd, setTouchEnd] = useState<null | number>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const curTarget = useWindowTargetManager();
  const [width, height] = useMemo(() => getPartnerLogoSizeByTarget[curTarget], [curTarget]);
  const listOfDots = useMemo(() => new Array(numberOfPages).fill('').map((_, index) => `dot${index}`), [numberOfPages]);
  const minSwipeDistance = 50;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setNumberOfPages(pageNumbersByTypeAndTarget[type][curTarget]);
    }
  }, []);

  useEffect(() => {
    setNumberOfPages(pageNumbersByTypeAndTarget[type][curTarget]);
    setSelectedPage(0);
  }, [curTarget, type]);

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (event): void => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (event): void => setTouchEnd(event.targetTouches[0].clientX);

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (): void => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && selectedPage !== numberOfPages - 1) {
      setSelectedPage(selectedPage + 1);
    } else if (isRightSwipe && selectedPage !== 0) {
      setSelectedPage(selectedPage - 1);
    }
  };

  return (
    <div className={classNames(styles.paginationContainer)}>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={classNames(styles.paginationContent, {
          [styles[`${type}Container`]]: true,
          [styles[`${curTarget}Target`]]: true,
          [styles[`page${selectedPage}`]]: true,
        })}
      >
        {isActivitiesList ? (
          <>
            {(items as components.Activity[]).map(({ uid, title, type, description, callToAction, picture }) => (
              <div key={uid}>
                {renderIconByType(type!)}
                <div className={styles.textContent}>
                  <h6>{title}</h6>
                  {mounted && <div dangerouslySetInnerHTML={{ __html: description }} />}
                </div>
                <Button onClick={() => router.push(callToAction.href)} text={callToAction.title} />
              </div>
            ))}
          </>
        ) : (
          <>
            {(items as components.Partner[]).map(({ uid, picture, callToAction }) => (
              <Link key={uid} href={callToAction.href} target="_blank">
                <Image src={picture.url} width={width} height={height} alt={picture.title} title={picture.title} />
              </Link>
            ))}
          </>
        )}
      </div>
      <div className={classNames(styles.dotsContainer)}>
        {listOfDots.map((dot, index) => (
          <button onClick={() => setSelectedPage(index)} key={dot} className={styles.dotButton}>
            <DotIcon className={classNames({ [selectedClass]: selectedPage === index })} />
          </button>
        ))}
      </div>
    </div>
  );
};
