import { useTranslation } from 'react-i18next';
import React from 'react';
import { AdvantageItem } from '../../componentsItemsTypes';
import { Title } from '../../components/shared/Title/Title';
import { TitleSecondary } from '../../components/shared/TitleSecondary/TitleSecondary';
import { Text } from '../../components/shared/Text/Text';
import { Video } from '../../components/about/Video/Video';
import { AdvantagesContent } from '../../components/about/AdvantagesContent/AdvantagesContent';
import { Partners } from '../../components/shared/Partners/Partners';
import './AboutPage.scss';

export const AboutPage = (): JSX.Element => {
  const { t } = useTranslation();

  const advantagesList: AdvantageItem[] = [
    {
      id: 10,
      number: '2500+',
      text: `${t('advantage.recipes')}`,
      additionalClass: 'recipes'
    },
    {
      id: 11,
      number: '2M+',
      text: `${t('advantage.customers')}`,
      additionalClass: 'customers'
    },
    {
      id: 12,
      number: '4.9',
      text: `${t('advantage.rating')}`,
      additionalClass: 'rating'
    },
    {
      id: 13,
      number: '12',
      text: `${t('advantage.awards')}`,
      additionalClass: 'awards'
    }
  ];

  return (
    <div className="about">
      <div className="about__team-content">
        <div className='about__team-text'>
          <Title title={t('ourTeam')} />
          <TitleSecondary title={t('ourTeamTitleSecondary')} />
          <Text text={t('ourTeamText')} />
        </div>
        <img
          className="about__image"
          src="https://i.postimg.cc/bwmD7Dqp/team.jpg"
          alt="Cooking Food & Drink Team"
        />
      </div>
      <AdvantagesContent advantages={advantagesList} />
      <div className="about__video-content">
        <div className='about__video'>
        <Video />
        </div>
        <div className='about__video-text'>
          <Title title={t('cookingTitle')} />
          <TitleSecondary title={t('cookingTitleSecondary')} />
          <Text text={t('cookingText')} />
        </div>
      </div>
      <Partners />
    </div>
  );
};
