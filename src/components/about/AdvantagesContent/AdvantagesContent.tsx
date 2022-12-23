import React from 'react';
import { Title } from '../../shared/Title/Title';
import { Advantage } from '../Advantage/Advantage';
import { Text } from '../../shared/Text/Text';
import { AdvantageItem } from '../../../pages/AboutPage/AboutPage';
import './AdvantagesContent.scss';

interface AdvantagesContentProps {
  advantages: AdvantageItem[];
}

export const AdvantagesContent = ({ advantages }: AdvantagesContentProps): JSX.Element => {
  return (
    <div className="advantages">
      <div className="advantages__text-content">
        <Title title="Why you choose us!" />
        <Text text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus vel itaque, ad asperiores eum totam deserunt laudantium dicta quod magnam expedita modi beatae inventore blanditiis dolores sint soluta reprehenderit omnis!" />
      </div>
      <div className="advantages__items">
        {advantages.map((advantage) => (
          <Advantage advantage={advantage} key={advantage.id} />
        ))}
      </div>
    </div>
  );
};
