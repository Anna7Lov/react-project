import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { changeLanguageAction, logoutUserAction } from '../../../rdx/user/actions';
import { LinkItem } from '../../../componentsItemsTypes';
import { Logo } from '../../shared/Logo/Logo';
import { HorizontalMenu } from '../../shared/HorizontalMenu/HorizontalMenu';
import './Header.scss';

interface HeaderProps {
  onThemeChanged: (checked: boolean) => void;
  theme: string;
}

export const Header = ({ onThemeChanged, theme }: HeaderProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { t, i18n } = useTranslation();

  const horizontalLinks: LinkItem[] = [
    { id: 1, name: `${t('nav.home')}`, address: '/' },
    { id: 2, name: `${t('nav.about')}`, address: '/about' },
    { id: 3, name: `${t('nav.gallery')}`, address: '/gallery' }
  ];

  const onEnglishClick = useCallback(() => {
    if (currentUser?.language !== 'en') {
      dispatch(changeLanguageAction('en'));
    }
  }, [dispatch, currentUser?.language]);

  const onUkrainianClick = useCallback(() => {
    if (currentUser?.language !== 'ua') {
      dispatch(changeLanguageAction('ua'));
    }
  }, [dispatch, currentUser?.language]);

  const onLogoutClicked = useCallback(() => {
    dispatch(logoutUserAction());
    window.location.href = '/login';
  }, [dispatch]);

  useEffect(
    () => {
      if (currentUser) {
        i18n.changeLanguage(currentUser.language);
      }
    }, [currentUser?.language]);

  return (
    <div className="header">
      <div className='header__inner'>
        <div className='header__inner-top'>
          <Logo />
          <HorizontalMenu links={horizontalLinks} />
        </div>
        {currentUser
          ? <div className='header__inner-bottom'>
            <div className='header__settings'>
              <div className="header__languages">
                <button onClick={onEnglishClick} className={currentUser.language === 'en'
                  ? 'header__language active-language'
                  : 'header__language'}>EN</button>
                <button onClick={onUkrainianClick} className={currentUser.language === 'en'
                  ? 'header__language'
                  : 'header__language active-language'}>UA</button>
              </div>

              <div className='header__switch'>
                <span className='header__switch-title'>{t('darkTheme')}</span>
                <Switch onChange={onThemeChanged} checked={theme === 'dark'} />
              </div>
            </div>

            <div className='header__user'>
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
            </div>
          </div>
          : ''
        }
      </div>
    </div>
  );
};
