import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAutocomplete,
  selectIsAutocompleteLoading,
  selectIsAutocompleteFailed
} from '../../../rdx/recipes/selectors';
import { Loading } from '../../shared/Loading/Loading';
import './Autocomplete.scss';

interface AutocompleteProps {
  debouncedQuery: string;
}

export const Autocomplete = ({
  debouncedQuery
}: AutocompleteProps): JSX.Element => {
  const autocompleteList = useSelector(selectAutocomplete);
  const isAutocompleteListLoading = useSelector(selectIsAutocompleteLoading);
  const autocompleteListError = useSelector(selectIsAutocompleteFailed);
  const { t } = useTranslation();

  return (
    <div className="autocomplete">
      {isAutocompleteListLoading && debouncedQuery !== ''
        ? (<Loading />)
        : !isAutocompleteListLoading && !autocompleteListError
            ? !autocompleteList.length && debouncedQuery !== ''
                ? (<div className='autocomplete__no-results'>
                  {t('autocompleteNoResults')}
                  </div>)
                : autocompleteList.length
                  ? (<div>
                <h3 className='autocomplete__subtitile'>
                  {t('autocompleteSubtitle')}
                </h3>
                <ul className="autocomplete__list">
                  {autocompleteList.map((item) => (
                    <li key={item.id} className="autocomplete__item">
                      <Link
                        to={`/recipes/${item.id}/information`}
                        className="autocomplete__link"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
                    )
                  : ''
            : autocompleteListError
              ? (<div className="autocomplete__no-results">
              Error: {autocompleteListError?.message}
            </div>)
              : ('')}
    </div>
  );
};
