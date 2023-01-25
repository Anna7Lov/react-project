import { useTranslation } from 'react-i18next';
import React from 'react';
import { AdvantageItem } from '../../../componentsItemsTypes';
import { TitleSecondary } from '../../shared/TitleSecondary/TitleSecondary';
import { Advantage } from '../Advantage/Advantage';
import { Text } from '../../shared/Text/Text';
import './AdvantagesContent.scss';

interface AdvantagesContentProps {
  advantages: AdvantageItem[];
}

export const AdvantagesContent = ({ advantages }: AdvantagesContentProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="advantages">
      <div className="advantages__text-content">
        <TitleSecondary title={t('advantagesTitle')} />
        <Text text={t('advantagesText')} />
      </div>
      <div className="advantages__items">
        {advantages.map((advantage) => (
          <Advantage advantage={advantage} key={advantage.id} />
        ))}
      </div>
    </div>
  );
};
