import { FC } from 'react';

import { Section } from '@components/.';

import { Post } from '@components/molecules/Post';

export const SectionWithPost: FC<components.SectionWithPost> = (props) => {
  const {
    post,
    sectionBgColor = '#fff',
    sectionTextColor = '#000',
    isTopSection,
  } = props;

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
        <Post {...post} />
    </Section>
  );
};
