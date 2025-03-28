declare namespace contentTypes {
  type HeaderProps = {
    title: string;
    uid: string;
    navigation: Link[];
    locales: string[];
    locale: string;
    logo: Image;
    call_to_action: Link;
  };

  type FooterProps = {
    title: string;
    uid: string;
    navigation: Link[];
    types_of_support_links: Link[];
    social_links: Link[];
    copyright: string;
    logo: Image;
  };

  type Page = {
    page_components: PageComponent[];
    uid: string;
    locale: string;
    url: string;
    title: string;
  };

  type Post = {
    title: string;
    description: string;
    picture: contentTypes.Image;
    picture_height_by_target: {
      mobile: string;
      tablet: string;
      desktop: string;
      desktop_wide: string;
    };
    sub_title?: string;
    call_to_action?: contentTypes.Link;
    has_show_more_button?: boolean;
    left_picture_positioning?: boolean;
    anchor?: string;
    show_less_label?: string;
    show_more_label?: string;
  };

  type SupportUsSection = {
    title_first_line: string;
    title_second_line: string;
    action_link: Link;
    bg_color: string;
    text_color: string;
  }

  type PageComponent = {
    title: string;
  };

  type NavLink = {
    link: Link[];
  };

  type Link = {
    title: string;
    href: string;
  };

  type Image = {
    filename: string;
    url: string;
  };
}
