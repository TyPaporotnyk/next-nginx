import React, { FC } from 'react';
import { MAP_COMPONENT_BY_UID } from './constants';

export const RenderComponents: FC<components.RenderProps> = ({ pageComponents, locale }) => {
  return (
    <>
      {pageComponents?.map(({ uid, props }) => {
        const Component = MAP_COMPONENT_BY_UID[uid];
        return Component ? <Component key={Math.random()} {...props} locale={locale} /> : null;
      })}
    </>
  );
};
