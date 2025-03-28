import { FC } from 'react';

import styles from './contact.module.scss';
import Link from 'next/link';
import { FBIcon, InstaIcon, TiktokIcon } from '@components/icons';

const renderIconByType = (type: string) => {
  if (type === 'fb') {
    return <FBIcon color="#737373" />;
  } else if (type === 'insta') {
    return <InstaIcon color="#737373" />;
  } else if (type === 'ttok') {
    return <TiktokIcon color="#737373" />;
  }
  return null;
};

export const Contact: FC<
  components.Contact & { locale: string; onSelectContact: (contact: components.Contact) => void }
> = (props) => {
  const { locale, onSelectContact, ...contact } = props;
  const { title, city, email, address, phone, socialRefs } = contact;
  const phoneLabel = locale === 'uk-ua' ? 'тел: ' : 'phone: ';

  return (
    <div onClick={() => onSelectContact(contact)} className={styles.contactContainer}>
      <h5>{title}</h5>
      <h5>{city}</h5>
      <p>{address}</p>
      <p>
        {phoneLabel}
        <span>{phone}</span>
      </p>
      <p>
        Email: <span>{email}</span>
      </p>
      <div className={styles.socialIconsContainer}>
        {socialRefs.map(
          ({ type, href }) =>
            href && (
              <Link key={type} href={href} className={styles.socialLink}>
                {renderIconByType(type)}
              </Link>
            ),
        )}
      </div>
    </div>
  );
};
