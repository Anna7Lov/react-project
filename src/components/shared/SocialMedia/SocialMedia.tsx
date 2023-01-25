import React from 'react';
import { socialMediaItem } from '../../../componentsItemsTypes';
import './SocialMedia.scss';

interface SocialMediaProps {
  socialMediaItems: socialMediaItem[];
}

export const SocialMedia = ({ socialMediaItems }: SocialMediaProps): JSX.Element => {
  return (
    <ul className="social-media">
      {socialMediaItems.map((item) => (
        <li key={item.id} className="social-media__item">
          <a href={item.address} className="social-media__link">
            <span className={`social-media__element ${String(item.name)}`}></span>
          </a>
        </li>
      ))}
    </ul>
  );
};
