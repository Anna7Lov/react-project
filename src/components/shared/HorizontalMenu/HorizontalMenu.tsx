import React from 'react';
import { Link } from 'react-router-dom';
import { LinkItem } from '../Header/Header';
import './HorizontalMenu.scss';

interface HorizontalMenuProps {
  links: LinkItem[];
}

export const HorizontalMenu = ({ links }: HorizontalMenuProps): JSX.Element => {
  return (
    <nav className="horizontal-menu">
      <ul className="horizontal-menu__links">
        {links.map((link) => (
          <li key={link.id} className="horizontal-menu__item">
            <Link to={link.address} className="horizontal-menu__link">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
