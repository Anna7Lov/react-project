import Switch from 'react-switch';
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

interface HeaderProps {
  onThemeChanged: (checked: boolean) => void;
  theme: string;
}

export const Header = ({ onThemeChanged, theme }: HeaderProps): JSX.Element => {
  return (
    <div className="header">
      <div className='header__inner'>
      <Logo />
      <HorizontalMenu links={horizontalLinks} />
      <div className='header__switch'>
      <span className='header__switch-title'>Dark theme</span>
      <Switch onChange={onThemeChanged} checked={theme === 'dark'} />
      </div>
      </div>
    </div>
  );
};
