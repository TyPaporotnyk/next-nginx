import { ChangeEvent, FC, useMemo, useState } from 'react';

import { SearchIcon, Section, Contact } from '@components/.';

import styles from './contactsSection.module.scss';
import Image from 'next/image';

export const ContactsSection: FC<components.ContactsSection> = (props) => {
  const {
    title,
    sectionBgColor,
    sectionTextColor,
    notFoundText,
    searchPlaceholder,
    contactsList,
    isTopSection,
    locale,
  } = props;
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contactsList);
  const [selectedContact, setSelectedContact] = useState(contactsList[0]);
  const hasMap = useMemo(() => !!(selectedContact.address && selectedContact.picture && selectedContact.googleMapLink), [selectedContact])
  const onSearchChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    setSearchText(newText);

    if (newText.length >= 2) {
      setFilteredContacts(
        filteredContacts.filter((contact) => contact.title.toLowerCase().includes(newText.toLowerCase())),
      );
    } else if (contactsList.length !== filteredContacts.length) {
      setFilteredContacts(contactsList);
    }
  };

  const onSelectContact = (contact: components.Contact): void => {
    setSelectedContact(contact);
  };

  return (
    <Section bgColor={sectionBgColor} textColor={sectionTextColor} isFirstSection={isTopSection}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.wrapper}>
        <div className={styles.contactsInformation}>
          <div className={styles.inputContainer}>
            <input type="text" placeholder={searchPlaceholder} value={searchText} onChange={onSearchChanged} />
            <SearchIcon />
          </div>
          <div className={styles.contactsOuterContainer}>
            <div className={styles.contactsInnerContainer}>
              {filteredContacts?.length ? (
                filteredContacts.map((contact) => <Contact key={contact.uid} {...contact} locale={locale!} onSelectContact={onSelectContact} />)
              ) : (
                <p>{notFoundText}</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper}>
          {hasMap && (
            <a href={selectedContact.googleMapLink} target="_blank" >
              <Image
                src={selectedContact.picture!}
                alt={selectedContact.city}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={500}
                height={300}
              />
            </a>
          )}
        </div>
      </div>
    </Section>
  );
};
