import { useTranslation } from 'react-i18next';
import React from 'react';
import { BreakpointItem, MasonryImageItem } from '../../componentsItemsTypes';
import { Title } from '../../components/shared/Title/Title';
import { TitleSecondary } from '../../components/shared/TitleSecondary/TitleSecondary';
import { MasonryImages } from '../../components/gallery/MasonryImages/MasonryImages';
import './GalleryPage.scss';

const galleryImagesList: MasonryImageItem[] = [
  {
    id: 500,
    image: 'https://i.postimg.cc/0Qy0qxLF/gallery1.jpg',
    alt: 'Paella'
  },
  {
    id: 501,
    image: 'https://i.postimg.cc/pr9QpCVB/gallery2.jpg',
    alt: 'Woman cooking in the kitchen'
  },
  {
    id: 502,
    image: 'https://i.postimg.cc/DZpdvHhZ/gallery3.jpg',
    alt: 'Chicken with potatoes and asparagus'
  },
  {
    id: 503,
    image: 'https://i.postimg.cc/5yZBvz6W/gallery4.jpg',
    alt: 'Pizza'
  },
  {
    id: 504,
    image: 'https://i.postimg.cc/ZYgFXGjs/gallery5.jpg',
    alt: 'Cocktail'
  },
  {
    id: 505,
    image: 'https://i.postimg.cc/7Y2M4KWH/gallery6.jpg',
    alt: 'Man cooking in the kitchen'
  },
  {
    id: 506,
    image: 'https://i.postimg.cc/q7k884Mq/gallery7.webp',
    alt: 'Family cooking in the kitchen'
  },
  {
    id: 507,
    image: 'https://i.postimg.cc/0yGYMbvh/gallery8.jpg',
    alt: 'Unagi Sushi'
  },
  {
    id: 508,
    image: 'https://i.postimg.cc/Njv8jR31/gallery9.jpg',
    alt: 'Smoothie with kiwi'
  },
  {
    id: 509,
    image: 'https://i.postimg.cc/rpQ5j3KJ/gallery10.jpg',
    alt: 'Mexican taco'
  },
  {
    id: 510,
    image: 'https://i.postimg.cc/C15kQ78V/gallery11.webp',
    alt: 'Strawberry cake'
  },
  {
    id: 511,
    image: 'https://i.postimg.cc/5ySZP8FL/gallery12.jpg',
    alt: 'Man and girl cooking in the kitchen'
  }
];

const breakpointCols: BreakpointItem = {
  default: 3,
  1000: 2,
  550: 1
};

export const GalleryPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="gallery">
      <div className='gallery__info'>
        <Title title={t('galleryTitle')} />
        <TitleSecondary title={t('galleryTitleSecondary')} />
        <div className='gallery__text'>{t('galleryTextSend')}
          <a href="mailto:gallery@cooking.com" className="gallery__email">
            gallery@cooking.com
          </a> {t('galleryTextPlace')}
        </div>
      </div>
      <MasonryImages items={galleryImagesList} breakpointCols={breakpointCols} />
    </div>
  );
};
