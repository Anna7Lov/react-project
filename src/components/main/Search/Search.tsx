import { useDebounce } from 'usehooks-ts';
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

const cuisineList: DropDownModel[] = [
  {
    id: 50,
    title: 'Cuisine',
    list: [
      { id: 51, value: '', name: 'Choose Cuisine' },
      { id: 52, value: 'american', name: 'American' },
      { id: 53, value: 'caribbean', name: 'Caribbean' },
      { id: 54, value: 'chinese', name: 'Chinese' },
      { id: 55, value: 'eastern european', name: 'Eastern European' },
      { id: 56, value: 'italian', name: 'Italian' },
      { id: 57, value: 'japanese', name: 'Japanese' },
      { id: 58, value: 'mexican', name: 'Mexican' },
      { id: 59, value: 'thai', name: 'Thai' },
      { id: 60, value: '', name: 'All cuisines' }
    ]
  }
];

const dietList: DropDownModel[] = [
  {
    id: 60,
    title: 'Diet',
    list: [
      { id: 61, value: '', name: 'Choose Diet' },
      { id: 62, value: 'vegetarian', name: 'Vegetarian' },
      { id: 63, value: 'vegan', name: 'Vegan' },
      { id: 64, value: 'gluten free', name: 'Gluten Free' },
      { id: 65, value: '', name: 'No diet' }
    ]
  }
];

const mealTypeList: DropDownModel[] = [
  {
    id: 70,
    title: 'Type',
    list: [
      { id: 71, value: '', name: 'Choose Meal type' },
      { id: 72, value: 'main course', name: 'Main course' },
      { id: 73, value: 'dessert', name: 'Dessert' },
      { id: 74, value: 'salad', name: 'Salad' },
      { id: 75, value: 'soup', name: 'Soup' },
      { id: 76, value: 'snack', name: 'Snack' },
      { id: 77, value: 'drink', name: 'Drink' },
      { id: 78, value: '', name: 'All types' }
    ]
  }
];

const sortList: DropDownModel[] = [
  {
    id: 100,
    title: 'Sort',
    list: [
      { id: 101, value: '', name: 'Sort By' },
      { id: 102, value: 'popularity', name: 'Popularity (from the most popular)' },
      { id: 103, value: 'time', name: 'Time (from the fastest to prepare)' },
      { id: 104, value: 'calories', name: 'Calories (from the least caloric)' },
      { id: 105, value: '', name: 'Default' }
    ]
  }
];

export const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchToolsRef = useRef(null);

  const [inputText, setInputText] = useState<string>(searchParams.get('query') ?? '');
  const debouncedQuery = useDebounce<string>(inputText, 500);
  const [isDropDownBoxOpened, setIsDropDownBoxOpened] = useState(false);
  const [query, setQuery] = useState<string>(searchParams.get('query') ?? '');
  const [cuisine, setCuisine] = useState<string>(searchParams.get('cuisine') ?? '');
  const [diet, setDiet] = useState<string>(searchParams.get('diet') ?? '');
  const [mealType, setMealType] = useState<string>(searchParams.get('type') ?? '');
  const [excludeOnion, setExcludeOnion] = useState<string>(
    searchParams.get('excludeIngredients') ?? ''
  );
  const [isInputChecked, setIsInputChecked] = useState(false);
  const [sort, setSort] = useState<string>(searchParams.get('sort') ?? '');
  const [sortDirection, setSortDirection] = useState<string>(
    searchParams.get('sortDirection') ?? ''
  );

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
  }, [debouncedQuery]);

  useEffect(() => {
    setSearchParams(
      `${query === '' ? '' : `&query=${query}`}${cuisine === '' ? '' : `&cuisine=${cuisine}`
      }${diet === '' ? '' : `&diet=${diet}`}${mealType === '' ? '' : `&type=${mealType}`
      }${excludeOnion === '' ? '' : `&excludeIngredients=${excludeOnion}`}${sort === '' ? '' : `&sort=${sort}`
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
  }, [query, cuisine, diet, mealType, excludeOnion, sort, sortDirection]);

  return (
    <div className="search">
      <div className="search__tools-wrapper">
        <div className="search__tools" ref={searchToolsRef}>
          <form className='search__form' onSubmit={onSearchFormSubmit}>
            <input
              value={inputText}
              placeholder="Search..."
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
            Without Onion
          </label>
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
