import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsRecipeTasteFailed,
  selectIsRecipeTasteLoading,
  selectRecipeTaste
} from '../../../rdx/recipes/selectors';
import { RecipeTasteModel } from '../../../services/recipesTypes';
import { Loading } from '../../shared/Loading/Loading';
import { Subtitle } from '../Subtitle/Subtitle';
import './RecipeTaste.scss';

export const RecipeTaste = (): JSX.Element => {
  const recipeTaste = useSelector(selectRecipeTaste);
  const isRecipeTasteLoading = useSelector(selectIsRecipeTasteLoading);
  const recipeTasteError = useSelector(selectIsRecipeTasteFailed);

  return (
    <div className='recipe-taste'>
      {isRecipeTasteLoading
        ? (<Loading />)
        : !isRecipeTasteLoading && !recipeTasteError
            ? (<div>
            <Subtitle subtitle='Feel the Taste!' />
            <p className='recipe-taste__text'>Our indicators will help you imagine the taste of the recipe before cooking.
              Sweetness, saltiness, sourness, bitterness, savoriness and fattiness are between 0 and 100 while the spiciness value is in scoville on an open scale of 0 and above.
              Of course, taste is very personal and it depends on how it is prepared.</p>
            <ul className='recipe-taste__list'>
              {Object.keys(recipeTaste).map((key) => (
                <li key={key} className={`recipe-taste__item ${key}`} >
                  {key}: {recipeTaste[key as keyof RecipeTasteModel]}
                </li>
              ))}
            </ul>
          </div>)
            : <div className="recipe-taste__error">
            No Taste results. {recipeTasteError?.message}
          </div>}
    </div>
  );
};
