import React from 'react';
import { Search } from '../../components/main/Search/Search';
import { Subtitle } from '../../components/shared/Subtitle/Subtitle';
import { Title } from '../../components/shared/Title/Title';
import { Text } from '../../components/shared/Text/Text';
import { Video } from '../../components/main/Video/Video';
import { AdvantagesContent } from '../../components/main/AdvantagesContent/AdvantagesContent';
import './HomePage.scss';

export const HomePage = (): JSX.Element => {
  return (
    <div>
      <Search />
      <AdvantagesContent />
      <div className="video-content">
        <Video />
        <div className="video-content__text">
          <Subtitle title="Let`s cook" />
          <Title title="Cooking with Classical Music" />
          <Text text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus vel itaque, ad asperiores eum totam deserunt laudantium dicta quod magnam expedita modi beatae inventore blanditiis dolores sint soluta reprehenderit omnis!" />
        </div>
      </div>
    </div>
  );
};
