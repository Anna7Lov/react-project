import React from 'react';
import { AdvantageItem } from '../AdvantagesContent/AdvantagesContent';
import './Advantage.scss';

interface AdvantagesContentProps {
  advantage: AdvantageItem;
}

export const Advantage = ({ advantage }: AdvantagesContentProps): JSX.Element => {
  return (
    <div key={advantage.id} className="advantage">
      <h5 className={`advantage__number ${advantage.additionalClass}`}>
        {advantage.number}
      </h5>
      <p className="advantage__text">{advantage.text}</p>
    </div>
  );
};
