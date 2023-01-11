import { useTranslation } from 'react-i18next';
import React from 'react';
import { Title } from '../Title/Title';
import './Partners.scss';

export interface PartnerItem {
  id: number;
  logo: string;
  alt: string;
  class: string;
}

const partnersList: PartnerItem[] = [
  {
    id: 300,
    logo: 'https://i.postimg.cc/3dX9Nfdz/partner1.png',
    alt: 'Let`s get Cooking Logo',
    class: 'cooking'
  },
  {
    id: 301,
    logo: 'https://i.postimg.cc/gXP8C8W8/partner2.png',
    alt: 'Kitchen on Fire Logo',
    class: 'kitchen'
  },
  {
    id: 302,
    logo: 'https://i.postimg.cc/S27CkRS5/partner3.png',
    alt: 'Terrace restaurant Logo',
    class: 'terrace'
  },
  {
    id: 303,
    logo: 'https://i.postimg.cc/B8zSZ73g/partner4.png',
    alt: 'Clickky cafe Logo',
    class: 'clickky'
  }
];

export const Partners = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="partners">
      <div className="partners__subtitle">
        <Title title={t('ourPatners')}/>
      </div>
      <div className="partners__list">
        {partnersList.map((partner) => (
          <div key={partner.id} className={`partners__item ${partner.class}`}>
            <img src={partner.logo} alt={partner.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};
