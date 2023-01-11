import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { logoutUserAction } from '../../../rdx/user/actions';
import { Logo } from '../../shared/Logo/Logo';
import { HorizontalMenu } from '../../shared/HorizontalMenu/HorizontalMenu';
import './Header.scss';

interface HeaderProps {
  onThemeChanged: (checked: boolean) => void;
  theme: string;
}

export interface LinkItem {
  id: number;
  name: string;
  address: string;
}

export const Header = ({ onThemeChanged, theme }: HeaderProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { t, i18n } = useTranslation();
  const [isEnglishActive, setIsEnglishActive] = useState<boolean>(i18n.language !== 'ua');

  const horizontalLinks: LinkItem[] = [
    { id: 1, name: `${t('nav.home')}`, address: '/' },
    { id: 2, name: `${t('nav.about')}`, address: '/about' },
    { id: 3, name: `${t('nav.reviews')}`, address: '/reviews' }
  ];

  const onEnglishClick = useCallback(() => {
    i18n.changeLanguage('en');
    setIsEnglishActive(true);
  }, []);

  const onUkrainianClick = useCallback(() => {
    i18n.changeLanguage('ua');
    setIsEnglishActive(false);
  }, []);

  const onLogoutClicked = useCallback(() => {
    dispatch(logoutUserAction());
  }, [dispatch]);

  return (
    <div className="header">
      <div className='header__inner'>
        <Logo />
        <HorizontalMenu links={horizontalLinks} />
        <div className="header__languages">
          <button onClick={onEnglishClick} className={isEnglishActive
            ? 'header__language active-language'
            : 'header__language'}>EN</button>
          <button onClick={onUkrainianClick} className={isEnglishActive
            ? 'header__language'
            : 'header__language active-language'}>UA</button>
        </div>
        <div className='header__switch'>
          <span className='header__switch-title'>{t('darkTheme')}</span>
          <Switch onChange={onThemeChanged} checked={theme === 'dark'} />
        </div>

        {currentUser
          ? (<div className='header__user'>
            <span className='header__icon'>{currentUser?.name[0]}{currentUser?.lastName[0]}</span>
            <span>{currentUser.email.length < 25
              ? currentUser?.email
              : `${currentUser?.email.substring(0, 22)}...`}
            </span>
            <div className='header__user-sections'>
              <Link to={'/profile'} className="header__user-link">
                {t('profile')}
              </Link>
              <button type='button' className='header__logout' onClick={onLogoutClicked}>
                {t('logOut')}
              </button>
            </div>
          </div>)
          : ''
        }

      </div>
    </div>
  );
};
