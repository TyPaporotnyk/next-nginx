import { FC } from 'react';
import {
  SectionWithPosts,
  SupportUsSection,
  SectionWithPost,
  HeroDetailsSection,
  HeroBannerSection,
  PartnersSection,
  AreasOfActivitySection,
  // PaymentsDetailsInfo,
} from '../.';
import { PaymentsDetailsInfo } from '@components/organisms/PaymentsDetailsInfo';
import { ContactsSection } from '@components/organisms/ContactsSection/ContactsSection';
import { AskForHelpInfoSection } from '@components/organisms/AskForHelpInfoSection/AskForHelpInfoSection';
import { PageNotFoundContent } from '../PageNotFoundContent';

export const SECTION_WITH_POSTS = 'section_with_posts';
export const SECTION_WITH_POST = 'section_with_post';
export const PAYMENTS_DETAILS_INFO = 'payments_details_info';
export const SUPPORT_US_SECTION = 'support_us_section';
export const HERO_DETAILS_SECTION = 'hero_details_section';
export const HERO_BANNER_SECTION = 'hero_banner_section';
export const PARTNERS_SECTION = 'partners_section';
export const AREAS_OF_ACTIVITY_SECTION = 'areas_of_activity_section';
export const CONTACTS_SECTION = 'contacts_section';
export const ASK_FOR_HELP_INFO_SECTION = 'ask_for_help_info_section';
export const PAGE_NOT_FOUND_CONTENT = 'page_not_found_content';

export const MAP_COMPONENT_BY_UID: Record<string, FC<any>> = {
  [SECTION_WITH_POSTS]: SectionWithPosts,
  [SECTION_WITH_POST]: SectionWithPost,
  [SUPPORT_US_SECTION]: SupportUsSection,
  [HERO_DETAILS_SECTION]: HeroDetailsSection,
  [HERO_BANNER_SECTION]: HeroBannerSection,
  [PARTNERS_SECTION]: PartnersSection,
  [AREAS_OF_ACTIVITY_SECTION]: AreasOfActivitySection,
  [CONTACTS_SECTION]: ContactsSection,
  [ASK_FOR_HELP_INFO_SECTION]: AskForHelpInfoSection,
  [PAGE_NOT_FOUND_CONTENT]: PageNotFoundContent,
  [PAYMENTS_DETAILS_INFO]: PaymentsDetailsInfo,
};
