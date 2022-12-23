import React from 'react';
import { Link } from 'react-router-dom';
import { LinkItem } from '../Header/Header';
import { useThemeContext } from '../../../hooks/useThemeContext';
import './HorizontalMenu.scss';

interface HorizontalMenuProps {
  links: LinkItem[];
}

export const HorizontalMenu = ({ links }: HorizontalMenuProps): JSX.Element => {
  const theme = useThemeContext();
  return (
    <nav className="horizontal-menu">
      <ul className="horizontal-menu__links">
        {links.map((link) => (
          <li key={link.id} className="horizontal-menu__item">
            <Link to={link.address} className={theme === 'dark' ? 'horizontal-menu__link dark-link' : 'horizontal-menu__link'}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
