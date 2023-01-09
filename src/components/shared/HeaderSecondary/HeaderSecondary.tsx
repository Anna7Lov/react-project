import React from 'react';
import './HeaderSecondary.scss';

export const HeaderSecondary = (): JSX.Element => {
  return (
    <div className="header-secondary">
        <div className="header-secondary__inner">
          <span>Cooking Food & Drink</span>
          <a
            href="mailto:suppport@cooking.com"
            className="header-secondary__email"
          >
            suppport@cooking.com
          </a>
        </div>
      </div>
  );
};
