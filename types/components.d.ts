declare namespace components {
  interface Page {
    title: string;
    url: string;
    locale: string;
    pageComponents: DynamicComponent[];
    showTitle?: boolean;
  }
  interface PageData {
    title: string;
  }

  interface Header {
    callToAction: Link;
    locales: string[];
    logo: Image;
    navigationLinks: Link[];
    changeLang?: (lang: string) => void;
  }
  interface Footer {
    logo: Image;
    navigationLinks: Link[];
    socialLinks: Link[];
    typesOfHelpLinks: Link[];
    copyright: string;
  }

  interface RenderProps {
    pageComponents: Component[];
    locale: string;
  }

  interface DynamicComponent {
    uid: string;
    props: Record<string, any>;
  }

  interface SectionWithPosts {
    posts: Post[];
    title?: string;
    sectionBgColor?: string;
    sectionTextColor?: string;
    sectionCallToAction?: Link;
    isTopSection?: boolean;
  }

  interface SectionWithPost {
    post: Post;
    title?: string;
    sectionBgColor?: string;
    sectionTextColor?: string;
    sectionCallToAction?: Link;
    isTopSection?: boolean;
  }

  interface SupportUsSection {
    title: string;
    actionLink: Link;
    sectionBgColor: string;
    sectionTextColor: string;
  }

  interface HeroDetailsSection {
    posts: Post[];
    backButtonLabel: string;
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
  }

  interface HeroBannerSection {
    posts: Post[];
    callToAction: Link;
  }

  interface PartnersSection {
    title: string;
    partners: Partner[];
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
  }

  interface AreasOfActivitySection {
    title: string;
    activities: Activity[];
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
  }

  interface ContactsSection {
    title: string;
    contactsList: Contact[];
    notFoundText: string;
    searchPlaceholder?: string;
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
    locale?: string;
  }
  
  interface AskForHelpInfoSection {
    title: string;
    description: string;
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
  }
  interface PaymentsDetailsInfo {
    dataBlocks: Record<string,any>[];
    sectionBgColor?: string;
    sectionTextColor?: string;
    isTopSection?: boolean;
  }

  interface PageNotFoundContent {
    title: string;
    subTitle: string;
  }

  interface PaginationContainer {
    items: Activity[] | Partner[];
    color: 'primary' | 'secondary';
    type: 'activities' | 'partners';
  }

  interface Post {
    title: string;
    description: string;
    showLessLabel: string;
    showMoreLabel: string;
    picture: Image;
    picturePlaceholder: string;
    pictureHeightByTarget: {
      mobile: string;
      tablet: string;
      desktop: string;
      desktop_wide: string;
    };
    bannerPicture?: Image;
    bannerPlaceholder?: string;
    anchor?: string;
    callToAction?: Link;
    hasCallToAction?: boolean;
    leftPicturePositioning?: boolean;
    subTitle?: string;
    uid?: string;
  }

  interface Partner {
    uid: string;
    picture: Image;
    callToAction: Link;
  }

  type Activity = {
    uid: string;
    title: string;
    description: string;
    type: string;
    picture: Image;
    callToAction: Link;
  };

  type Contact = {
    title: string;
    city: string;
    email: string;
    phone: string;
    socialRefs: SocialRef[];
    address?: string;
    googleMapLink?: string;
    picture?: string;
    uid?: string;
  };

  type SocialRef = {
    type: string;
    href: string;
  };

  interface Button {
    text: string;
    onClick?: () => void;
    type?: 'header' | 'regular' | 'large';
    className?: string;
  }

  interface PageTitle {
    title: string;
  }

  interface LinkWithArrow {
    href: string;
    label: string;
    className?: string;
  }

  interface Section {
    children: React.ReactNode;
    isFirstSection?: boolean;
    bgColor?: string;
    textColor?: string;
    className?: string;
  }

  interface LanguageSwitcher {
    locale: string;
    onLangChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    locales?: string[];
  }

  interface SvgIcon {
    height?: number;
    width?: number;
    className?: string;
    color?: string;
  }

  type Link = {
    title: string;
    href: string;
  };

  type Image = {
    title: string;
    url: string;
  };

  type TargetType = 'mobile' | 'tablet' | 'desktop' | 'desktop_wide';
}
