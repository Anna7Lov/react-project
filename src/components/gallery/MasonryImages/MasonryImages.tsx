import Masonry from 'react-masonry-css';
import React from 'react';
import { BreakpointItem, MasonryImageItem } from '../../../componentsItemsTypes';
import './MasonryImages.scss';

interface MasonryImagesProps {
  items: MasonryImageItem[];
  breakpointCols: BreakpointItem;
}

export const MasonryImages = ({ items, breakpointCols }: MasonryImagesProps): JSX.Element => {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="masonry-images"
      columnClassName="masonry-images__column">
      {items.map((item) => (
        <img key={item.id} src={item.image} alt={item.alt} className='masonry-images__image' />
      ))}
    </Masonry>
  );
};
