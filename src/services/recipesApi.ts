import {
  RecipesSearchResponseType,
  RecipeModel,
  SimilarRecipeModel,
  AutocompleteModel
} from './recipesTypes';

const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = '3726eaf2941248f0bbd5c880725bbba8';

const commonHeaders = {
  'Content-Type': 'application/json'
};

interface CallApiEndpointParameters<BodyType> {
  endpoint: string;
  method?: string;
  headers?: { [index: string]: string };
  body?: BodyType;
}

interface CallApiEndpointResult<ResponseType> {
  error?: Error;
  success: boolean;
  response?: ResponseType;
}

export const callApiEndpoint = async <BodyType, ResponseType>({
  endpoint,
  method,
  body,
  headers
}: CallApiEndpointParameters<BodyType>):
Promise<CallApiEndpointResult<ResponseType>
> => {
  try {
    const response = await fetch([BASE_URL, endpoint].join('/'), {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { ...commonHeaders, ...headers }
    });
    if (response.ok) {
      const responseJson = await response.json();
      return {
        success: true,
        response: responseJson
      };
    }
    return {
      success: false,
      error: new Error('Something went wrong')
    };
  } catch (error) {
    return {
      success: false,
      error: new Error('Something went wrong')
    };
  }
};

export const searchRecipes = async (
  q: string,
  cuisine: string,
  diet: string,
  mealType: string,
  excludeOnion: string,
  sort: string,
  sortDirection: string
): Promise<CallApiEndpointResult<RecipesSearchResponseType>> =>
  await callApiEndpoint<undefined, RecipesSearchResponseType>({
    endpoint: `recipes/complexSearch?query=${q}&number=60&cuisine=${cuisine}&diet=${diet}&type=${mealType}&excludeIngredients=${excludeOnion}&sort=${sort}&sortDirection=${sortDirection}&apiKey=${API_KEY}`,
    method: 'GET'
  });

export const getRecipe = async (id: string): Promise<CallApiEndpointResult<RecipeModel>> =>
  await callApiEndpoint<undefined, RecipeModel>({
    endpoint: `recipes/${id}/information?apiKey=${API_KEY}`,
    method: 'GET'
  });

export const getSimilarRecipes = async (id: string): Promise<CallApiEndpointResult<SimilarRecipeModel[]>> =>
  await callApiEndpoint<undefined, SimilarRecipeModel[]>({
    endpoint: `recipes/${id}/similar?apiKey=${API_KEY}&number=6`,
    method: 'GET'
  });

export const getAutocomplete = async (q: string): Promise<CallApiEndpointResult<AutocompleteModel[]>> =>
  await callApiEndpoint<undefined, AutocompleteModel[]>({
    endpoint: `recipes/autocomplete?number=8&query=${q}&apiKey=${API_KEY}`,
    method: 'GET'
  });
