import React from 'react';
import { Link } from 'react-router-dom';
import { socialMediaItem } from '../Footer/Footer';
import './SocialMedia.scss';

interface SocialMediaProps {
  socialMediaItems: socialMediaItem[];
}

export const SocialMedia = ({ socialMediaItems }: SocialMediaProps): JSX.Element => {
  return (
    <ul className="social-media">
      {socialMediaItems.map((item) => (
        <li key={item.id} className="social-media__item">
          <Link to={item.address} className="social-media__link">
            <span className={`social-media__element ${item.name}`}></span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
