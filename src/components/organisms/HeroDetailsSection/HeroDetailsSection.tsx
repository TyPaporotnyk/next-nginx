import { FC } from 'react';

import { BackArrowIcon, Section } from '@components/.';

import styles from './heroDetailsSection.module.scss';
import Link from 'next/link';
import { Post } from '@components/molecules/Post';
import { useSearchParams } from 'next/navigation';

export const HeroDetailsSection: FC<components.HeroDetailsSection> = (props) => {
  const {
    posts,
    sectionBgColor,
    sectionTextColor,
    backButtonLabel,
    isTopSection,
  } = props;
  const searchParams = useSearchParams();
  const postId = searchParams.get('uid');
  const post = posts.find(({ uid }) => postId === uid);

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      <Link href="/" className={styles.backButton}>
        <BackArrowIcon />
        <div>{backButtonLabel}</div>
      </Link>
      {post && <Post {...post} />}
    </Section>
  );
};
