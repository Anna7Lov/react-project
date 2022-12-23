import React from 'react';
import { SocialMedia } from '../SocialMedia/SocialMedia';
import './Footer.scss';

export interface socialMediaItem {
  id: number;
  name: string;
  address: string;
}

const socialMediaList: socialMediaItem[] = [
  { id: 200, name: 'facebook', address: 'https://www.facebook.com/' },
  { id: 201, name: 'instagram', address: 'https://www.instagram.com/' },
  { id: 202, name: 'twitter', address: 'https://twitter.com/' },
  { id: 203, name: 'youtube', address: 'https://youtube.com/' },
  { id: 204, name: 'viber', address: 'https://viber.com/' },
  { id: 205, name: 'tiktok', address: 'https://www.tiktok.com/' }
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <SocialMedia socialMediaItems={socialMediaList} />
        <a href="mailto:suppport@cooking.com" className="footer__email">
          suppport@cooking.com
        </a>
      </div>
      <div className="footer__bottom">© 2022-2023 Cooking Food & Drink</div>
    </footer>
  );
};
