import { FC, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button } from '@components/.';

import { useWindowTargetManager } from '@hooks/.';

import styles from './post.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Post: FC<components.Post> = (props) => {
  const {
    title,
    description,
    anchor,
    callToAction,
    hasCallToAction,
    showLessLabel,
    showMoreLabel,
    picture,
    picturePlaceholder,
    pictureHeightByTarget,
    leftPicturePositioning,
    subTitle,
  } = props as any;
  const router = useRouter();
  const headerRef = useRef<null | HTMLHeadingElement>(null);
  const descriptionRef = useRef<null | HTMLDivElement>(null);
  const buttonRef = useRef<null | HTMLDivElement>(null);
  const pictureContainerRef = useRef<null | HTMLDivElement>(null);
  const [headerSize, setHeaderSize] = useState<number | null>();
  const curTarget = useWindowTargetManager();
  const [isFullText, setIsFullText] = useState(false);
  const moreLessButtonLabel = isFullText ? showLessLabel : showMoreLabel;
  const noTextCropping = false && hasCallToAction;
  // const noTextCropping = curTarget === 'desktop_wide' && !hasCallToAction && showLessLabel && showMoreLabel;
  const hasButton = true || !!callToAction?.href || !!moreLessButtonLabel;
  const placeholder = !picturePlaceholder ? 'empty' : 'blur';

  useEffect(() => {
    let headerResizeObserver: any;
    let headingElement: any;

    if (headerRef.current) {
      headingElement = headerRef.current.firstElementChild;

      headerResizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.height !== headerSize) {
            setHeaderSize(entry.contentRect.height);
          }
        }
      });
      headerResizeObserver.observe(headingElement);
      headingElement.nextElementSibling && headerResizeObserver.observe(headingElement.nextElementSibling);
    }

    return () => {
      headingElement && headerResizeObserver.unobserve(headingElement);
      headingElement.nextElementSibling && headerResizeObserver.unobserve(headingElement.nextElementSibling);
    };
  }, []);

  useEffect(() => {
    setUpSpecificContentHeight();
  }, [curTarget, headerSize]);

  const setUpSpecificContentHeight = (): void => {
    if (headerRef.current && descriptionRef.current && pictureContainerRef.current) {
      headerRef.current.style.height = 'auto';
      headerRef.current.style.overflow = 'visible';
      const headerHeight = headerRef.current.clientHeight;
      const headerMargin = parseInt(window.getComputedStyle(headerRef.current)['margin-bottom' as any]);
      const pictureHeight = pictureContainerRef.current.clientHeight;
      const buttonHeight = hasButton ? buttonRef.current?.clientHeight : 0;

      const maxDescriptionHeight = pictureHeight - buttonHeight! - headerHeight - headerMargin;

      if (maxDescriptionHeight > 0) {
        const descriptionLineHeight = parseInt(window.getComputedStyle(descriptionRef.current)['line-height' as any]);

        descriptionRef.current.style.height = noTextCropping
          ? 'auto'
          : maxDescriptionHeight - (maxDescriptionHeight % descriptionLineHeight) + 'px';
      } else {
        const headingElement = headerRef.current.firstElementChild || headerRef.current;
        const subTitleElement = headingElement.nextElementSibling;
        const isHeadingToCrop = !subTitleElement || headerHeight - headingElement.clientHeight < 0;
        const maxHeaderHeight = pictureHeight - buttonHeight! - headerMargin;
        let newHeight = 0;

        if (isHeadingToCrop) {
          const headingLineHeight = parseInt(window.getComputedStyle(headingElement)['line-height' as any]);
          newHeight = maxHeaderHeight - (maxHeaderHeight % headingLineHeight);
        } else {
          const subTitleLineHeight = parseInt(window.getComputedStyle(subTitleElement)['line-height' as any]);
          const maxSubTitleHeight = maxHeaderHeight - headingElement.clientHeight;
          newHeight = maxHeaderHeight - (maxSubTitleHeight % subTitleLineHeight);
        }

        headerRef.current.style.height = noTextCropping ? 'auto' : newHeight + 'px';

        headerRef.current.style.overflow = noTextCropping ? 'visible' : 'hidden';
        descriptionRef.current.style.height = noTextCropping ? 'auto' : '0px';
      }
    }
  };

  const setUpAutoContentHeight = (): void => {
    if (headerRef.current && descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      headerRef.current.style.height = 'auto';
    }
  };

  const toggleFullText = (): void => {
    setIsFullText(!isFullText);
    if (isFullText) {
      setUpSpecificContentHeight();
      pictureContainerRef.current?.parentElement?.parentElement?.scrollIntoView();
    } else {
      setUpAutoContentHeight();
    }
  };

  const actionButtonClick = (): void => {
    router.push(callToAction.href);
  };

  return (
    <div
      id={anchor}
      className={classNames(styles.contentContainer, { [styles.hasPictureOnLeft]: leftPicturePositioning })}
    >
      <div
        ref={pictureContainerRef}
        style={{ height: pictureHeightByTarget[curTarget] + 'px' }}
        className={styles.imageContainer}
      >
        <Image
          width={650}
          height={650}
          src={picture?.url}
          alt={picture?.title}
          placeholder={placeholder}
          blurDataURL={picturePlaceholder}
        />
      </div>
      <div
        style={{ height: isFullText || noTextCropping ? 'auto' : pictureHeightByTarget[curTarget] + 'px' }}
        className={styles.content}
      >
        <div ref={headerRef} className={styles.headerInfo}>
          <h4>{title}</h4>
          {subTitle && <p>{subTitle}</p>}
        </div>
        <div
          ref={descriptionRef}
          style={{ overflow: isFullText || noTextCropping ? 'auto' : 'hidden' }}
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className={styles.filler} />
        {hasButton && (
          <div ref={buttonRef} className={styles.button}>
            {(callToAction?.href && hasCallToAction) || (!showLessLabel && !showMoreLabel) ? (
              <Button onClick={actionButtonClick} text={callToAction.title} />
            ) : (
              <Button className={styles.showMoreLessButton} onClick={toggleFullText} text={moreLessButtonLabel!} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
