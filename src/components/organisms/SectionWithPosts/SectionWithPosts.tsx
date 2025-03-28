import { FC, useMemo } from 'react';
import Link from 'next/link';

import { Button, Section } from '@components/.';

import styles from './sectionWithPosts.module.scss';
import { Post } from '@components/molecules/Post';
import { mapPictureHeightByTargetForMultiplePosts } from './constants';
import { useRouter } from 'next/router';

export const SectionWithPosts: FC<components.SectionWithPosts> = (props) => {
  const router = useRouter();
  const { title, sectionBgColor, sectionTextColor, posts, sectionCallToAction, isTopSection } = props;

  const formattedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        pictureHeightByTarget: mapPictureHeightByTargetForMultiplePosts,
      })),
    [posts],
  );

  const actionButtonClick = (): void => {
    router.push(sectionCallToAction?.href || '/');
  };

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.multiplePosts}>
        {formattedPosts.map((post, index) => (
          <Post key={index} {...post} hasCallToAction />
        ))}
      </div>
      {sectionCallToAction?.href && (
        <Button className={styles.sectionButton} onClick={actionButtonClick} text={sectionCallToAction.title} />
      )}
    </Section>
  );
};
