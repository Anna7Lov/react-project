import { RecipesSearchResponseType, RecipeResponseType, RecipeModel } from './recipesTypes';

const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = 'a799d633c91f4dfd91e45de0667b5c14';

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
  console.log('endpoint: ', endpoint);
  console.log('method: ', method);
  console.log('body: ', body);
  console.log('headers: ', headers);

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
  sort: string
): Promise<CallApiEndpointResult<RecipesSearchResponseType>> =>
  await callApiEndpoint<undefined, RecipesSearchResponseType>({
    endpoint: `/recipes/complexSearch?query=${q}&number=72&cuisine=${cuisine}&diet=${diet}&type=${mealType}&excludeIngredients=${excludeOnion}&sort=${sort}&apiKey=${API_KEY}`,
    method: 'GET'
  });

export const getRecipe = async (id: string): Promise<CallApiEndpointResult<RecipeModel>> =>
  await callApiEndpoint<undefined, RecipeResponseType>({
    endpoint: `/recipes/${id}/information?apiKey=${API_KEY}`,
    method: 'GET'
  });
