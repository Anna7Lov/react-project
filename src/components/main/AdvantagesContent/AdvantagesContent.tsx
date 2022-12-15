import React from 'react';
import { Title } from '../../shared/Title/Title';
import { Advantage } from '../Advantage/Advantage';
import { Text } from '../../shared/Text/Text';
import './AdvantagesContent.scss';

export interface AdvantageItem {
  id: number;
  number: string;
  text: string;
  additionalClass: string;
}

const advantages: AdvantageItem[] = [
  {
    id: 10,
    number: '2500+',
    text: 'recipes in our database',
    additionalClass: 'recipes'
  },
  {
    id: 11,
    number: '2M+',
    text: 'happy customers',
    additionalClass: 'customers'
  },
  {
    id: 12,
    number: '4.9',
    text: 'average app rating',
    additionalClass: 'rating'
  },
  {
    id: 13,
    number: '12',
    text: 'awards received',
    additionalClass: 'awards'
  }
];

export const AdvantagesContent = (): JSX.Element => {
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
