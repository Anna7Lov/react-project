import { useDebounce } from 'usehooks-ts';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchRecipesThunk } from '../../../rdx/recipes/thunks';
import {
  selectRecipes,
  selectAreRecipesLoading,
  selectAreRecipesFailed
} from '../../../rdx/recipes/selectors';
import { DropDownList } from '../../shared/DropDownList/DropDownList';
import { RecipeTitle } from '../RecipeTitle/RecipeTitle';
import { Loading } from '../../shared/Loading/Loading';
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
      { id: 102, value: 'popularity', name: 'Popularity' },
      { id: 103, value: 'time', name: 'Time' },
      { id: 104, value: 'calories', name: 'Calories' },
      { id: 105, value: '', name: 'Default' }
    ]
  }
];

export const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectAreRecipesLoading);
  const error = useSelector(selectAreRecipesFailed);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isInputChecked, setIsInputChecked] = useState(false);
  const [query, setQuery] = useState<string>(searchParams.get('query') ?? '');
  const debouncedQuery = useDebounce<string>(query, 800);
  const [cuisine, setCuisine] = useState<string>(
    searchParams.get('cuisine') ?? ''
  );
  const [diet, setDiet] = useState<string>(searchParams.get('diet') ?? '');
  const [mealType, setMealType] = useState<string>(
    searchParams.get('type') ?? ''
  );
  const [excludeOnion, setExcludeOnion] = useState<string>(
    searchParams.get('excludeIngredients') ?? ''
  );
  const [sort, setSort] = useState<string>(searchParams.get('sort') ?? '');

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

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
  }, []);

  useEffect(() => {
    setSearchParams(
      `${debouncedQuery === '' ? '' : `&query=${debouncedQuery}`}${
        cuisine === '' ? '' : `&cuisine=${cuisine}`
      }${diet === '' ? '' : `&diet=${diet}`}${
        mealType === '' ? '' : `&type=${mealType}`
      }${excludeOnion === '' ? '' : `&excludeIngredients=${excludeOnion}`}${
        sort === '' ? '' : `&sort=${sort}`
      }`
    );

    dispatch(
      searchRecipesThunk(
        debouncedQuery,
        cuisine,
        diet,
        mealType,
        excludeOnion,
        sort
      )
    );
  }, [debouncedQuery, cuisine, diet, mealType, excludeOnion, sort]);

  return (
    <div className="search">
      <div className="search__tools-wrapper">
        <div className="search__tools">
          <input
            value={query}
            placeholder="Search..."
            type="search"
            className="search__input"
            onChange={onInputChange}
          />
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
      {isLoading
        ? (<Loading />)
        : !isLoading && !error
            ? (<div className="search__results">
          {recipes?.length
            ? (recipes.map((recipe) => (
              <RecipeTitle recipe={recipe} key={recipe.id} />
              )))
            : (
            <div className="search__no-results">
              No results. Try changing your search options.
            </div>
              )}
        </div>
              )
            : <div className="search__no-results">
        Error: {error?.message}
      </div> }
    </div>
  );
};
