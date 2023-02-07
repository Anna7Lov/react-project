import React from 'react';
import { AdvantageItem } from '../../../componentsItemsTypes';
import './Advantage.scss';

interface AdvantagesContentProps {
  advantage: AdvantageItem;
}

export const Advantage = ({ advantage }: AdvantagesContentProps): JSX.Element => {
  return (
    <div className="advantage">
      <h5 className={`advantage__number ${String(advantage.additionalClass)}`}>
        {advantage.number}
      </h5>
      <p className="advantage__text">{advantage.text}</p>
    </div>
  );
};
