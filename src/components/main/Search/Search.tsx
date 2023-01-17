import { useDebounce } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchRecipesThunk, getAutocompleteThunk } from '../../../rdx/recipes/thunks';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { DropDownList } from '../../shared/DropDownList/DropDownList';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import './Search.scss';

export interface DropDownModel {
  id: number;
  title: string;
  list: Array<{
    id: number;
    value: string;
    name: string;
  }>;
}

export const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchToolsRef = useRef(null);
  const [inputText, setInputText] = useState<string>(searchParams.get('query') ?? '');
  const debouncedQuery = useDebounce<string>(inputText, 500);
  const [isDropDownBoxOpened, setIsDropDownBoxOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(searchParams.get('query') ?? '');
  const [cuisine, setCuisine] = useState<string>(searchParams.get('cuisine') ?? '');
  const [diet, setDiet] = useState<string>(searchParams.get('diet') ?? '');
  const [mealType, setMealType] = useState<string>(searchParams.get('type') ?? '');
  const [excludeOnion, setExcludeOnion] = useState<string>(
    searchParams.get('excludeIngredients') ?? ''
  );
  const [isInputChecked, setIsInputChecked] = useState<boolean>(false);
  const [sort, setSort] = useState<string>(searchParams.get('sort') ?? '');
  const [sortDirection, setSortDirection] = useState<string>(
    searchParams.get('sortDirection') ?? ''
  );

  const { t } = useTranslation();

  const cuisineList: DropDownModel[] = [
    {
      id: 50,
      title: 'Cuisine',
      list: [
        { id: 51, value: '', name: `${t('cuisine.chooseCuisine')}` },
        { id: 52, value: 'american', name: `${t('cuisine.american')}` },
        { id: 53, value: 'caribbean', name: `${t('cuisine.caribbean')}` },
        { id: 54, value: 'chinese', name: `${t('cuisine.chinese')}` },
        { id: 55, value: 'eastern european', name: `${t('cuisine.easternEuropean')}` },
        { id: 56, value: 'italian', name: `${t('cuisine.italian')}` },
        { id: 57, value: 'japanese', name: `${t('cuisine.japanese')}` },
        { id: 58, value: 'mexican', name: `${t('cuisine.mexican')}` },
        { id: 59, value: 'thai', name: `${t('cuisine.thai')}` },
        { id: 60, value: '', name: `${t('cuisine.allCuisines')}` }
      ]
    }
  ];

  const dietList: DropDownModel[] = [
    {
      id: 60,
      title: 'Diet',
      list: [
        { id: 61, value: '', name: `${t('diet.chooseDiet')}` },
        { id: 62, value: 'vegetarian', name: `${t('diet.vegetarian')}` },
        { id: 63, value: 'vegan', name: `${t('diet.vegan')}` },
        { id: 64, value: 'gluten free', name: `${t('diet.glutenFree')}` },
        { id: 65, value: '', name: `${t('diet.noDiet')}` }
      ]
    }
  ];

  const mealTypeList: DropDownModel[] = [
    {
      id: 70,
      title: 'Type',
      list: [
        { id: 71, value: '', name: `${t('mealType.chooseMealType')}` },
        { id: 72, value: 'main course', name: `${t('mealType.mainCourse')}` },
        { id: 73, value: 'dessert', name: `${t('mealType.dessert')}` },
        { id: 74, value: 'salad', name: `${t('mealType.salad')}` },
        { id: 75, value: 'soup', name: `${t('mealType.soup')}` },
        { id: 76, value: 'snack', name: `${t('mealType.snack')}` },
        { id: 77, value: 'drink', name: `${t('mealType.drink')}` },
        { id: 78, value: '', name: `${t('mealType.allTypes')}` }
      ]
    }
  ];

  const sortList: DropDownModel[] = [
    {
      id: 100,
      title: 'Sort',
      list: [
        { id: 101, value: '', name: `${t('sort.sortBy')}` },
        { id: 102, value: 'popularity', name: `${t('sort.popularity')}` },
        { id: 103, value: 'time', name: `${t('sort.time')}` },
        { id: 104, value: 'calories', name: `${t('sort.calories')}` },
        { id: 105, value: '', name: `${t('sort.byDefault')}` }
      ]
    }
  ];

  const closeDropDownBox = useCallback(
    () => {
      setIsDropDownBoxOpened(false);
    },
    []
  );

  const onSearchFormSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setQuery(inputText);
      closeDropDownBox();
    },
    [inputText, closeDropDownBox]
  );

  const onInputClick = useCallback(
    () => {
      if (!isDropDownBoxOpened) {
        setIsDropDownBoxOpened(true);
      }
    },
    [isDropDownBoxOpened]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      if (!isDropDownBoxOpened) {
        setIsDropDownBoxOpened(true);
      }
    },
    [isDropDownBoxOpened]
  );

  useOnClickOutside(searchToolsRef, closeDropDownBox, isDropDownBoxOpened);

  const chooseCuisine = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCuisine(e.target.value);
    },
    []
  );

  const chooseDiet = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDiet(e.target.value);
  }, []);

  const chooseMealType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMealType(e.target.value);
    },
    []
  );

  const handleCheckboxChange = useCallback(() => {
    setIsInputChecked(!isInputChecked);
    excludeOnion === '' ? setExcludeOnion('onion') : setExcludeOnion('');
  }, [isInputChecked, excludeOnion]);

  const onSortClick = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    if (e.target.value === 'popularity') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  }, []);

  useEffect(() => {
    dispatch(getAutocompleteThunk(debouncedQuery));
  }, [dispatch, debouncedQuery]);

  useEffect(() => {
    setSearchParams(
      `${query === '' ? '' : `&query=${query}`}${cuisine === '' ? '' : `&cuisine=${cuisine}`
      }${diet === '' ? '' : `&diet=${diet}`}${mealType === '' ? '' : `&type=${mealType}`
      }${excludeOnion === '' ? '' : `&excludeIngredients=${excludeOnion}`
      }${sort === '' ? '' : `&sort=${sort}`
      }${sortDirection === '' ? '' : `&sortDirection=${sortDirection}`
      }`
    );

    dispatch(
      searchRecipesThunk(
        query,
        cuisine,
        diet,
        mealType,
        excludeOnion,
        sort,
        sortDirection
      )
    );
  }, [query, cuisine, diet, mealType, excludeOnion, sort, sortDirection, dispatch]);

  return (
    <div className="search">
      <div className="search__tools-wrapper">
        <div className="search__tools" ref={searchToolsRef}>
          <form className='search__form' onSubmit={onSearchFormSubmit}>
            <input
              value={inputText}
              placeholder={`${t('search')}`}
              type="search"
              className="search__input"
              onClick={onInputClick}
              onChange={onInputChange}
            />
            <button className='search__button'></button>
          </form>

          {isDropDownBoxOpened
            ? <Autocomplete debouncedQuery={debouncedQuery} />
            : null
          }
        </div>

        <div className="search__filters">
          <div className='search__filters-top'>
          <DropDownList
            items={cuisineList}
            value={cuisine}
            handleSelectChange={chooseCuisine}
          />
          <DropDownList
            items={dietList}
            value={diet}
            handleSelectChange={chooseDiet}
          />
          </div>

          <div className='search__filters-bottom'>
          <DropDownList
            items={mealTypeList}
            value={mealType}
            handleSelectChange={chooseMealType}
          />
          <label className="search__checkbox-label">
            <input
              type="checkbox"
              checked={isInputChecked}
              onChange={handleCheckboxChange}
            />
            {t('withoutOnion')}
          </label>
          </div>
        </div>
        <div className="search__sort">
          <DropDownList
            items={sortList}
            value={sort}
            handleSelectChange={onSortClick}
          />
        </div>
      </div>
    </div>
  );
};
