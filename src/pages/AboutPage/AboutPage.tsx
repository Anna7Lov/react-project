import React from 'react';
import { Title } from '../../components/shared/Title/Title';
import { TitleSecondary } from '../../components/shared/TitleSecondary/TitleSecondary';
import { Text } from '../../components/shared/Text/Text';
import { Video } from '../../components/about/Video/Video';
import { AdvantagesContent } from '../../components/about/AdvantagesContent/AdvantagesContent';
import { Partners } from '../../components/shared/Partners/Partners';
import './AboutPage.scss';

export interface AdvantageItem {
  id: number;
  number: string;
  text: string;
  additionalClass: string;
}

const advantagesList: AdvantageItem[] = [
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

export const AboutPage = (): JSX.Element => {
  return (
    <div className='about'>
     <div className="about__team-content">
        <div>
          <Title title="Our Team" />
          <TitleSecondary title="We are in love with cooking" />
          <Text text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus vel itaque, ad asperiores eum totam deserunt laudantium dicta quod magnam expedita modi beatae inventore blanditiis dolores sint soluta reprehenderit omnis. Lorem ipsum dolor, sit amet consectetur adipisicing elit!" />
        </div>
        <img className='about__image' src="https://i.postimg.cc/bwmD7Dqp/team.jpg" alt="Cooking Food & Drink Team" />
      </div>
      <AdvantagesContent advantages={advantagesList} />
      <div className="about__video-content">
        <Video />
        <div>
          <Title title="Let`s cook" />
          <TitleSecondary title="Cooking with Classical Music" />
          <Text text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus vel itaque, ad asperiores eum totam deserunt laudantium dicta quod magnam expedita modi beatae inventore blanditiis dolores sint soluta reprehenderit omnis. Lorem ipsum dolor, sit amet consectetur adipisicing elit!" />
        </div>
      </div>
      <Partners />
    </div>
  );
};
