import React from 'react';
import { Logo } from '../../shared/Logo/Logo';
import { HorizontalMenu } from '../../shared/HorizontalMenu/HorizontalMenu';
import './Header.scss';

export interface LinkItem {
  id: number;
  name: string;
  address: string;
}

const horizontalLinks: LinkItem[] = [
  { id: 1, name: 'Home', address: '/' },
  { id: 2, name: 'Features', address: '/features' },
  { id: 3, name: 'Gallery', address: '/gallery' },
  { id: 4, name: 'Reviews', address: '/reviews' }
];

export const Header = (): JSX.Element => {
  return (
    <div className="header">
      <Logo />
      <HorizontalMenu links={horizontalLinks} />
    </div>
  );
};
