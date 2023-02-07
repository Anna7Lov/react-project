export interface RecipeTitleModel {
  id: number;
  title: string;
  image: string;
}

export interface RecipesSearchResponseType {
  results: RecipeTitleModel[];
}

export enum RequestState {
  Unset = 'Unset',
  Waiting = 'Waiting',
  Success = 'Success',
  Failure = 'Failure'
}

interface IngredientModel {
  name: string;
  original: string;
}

interface InstructionModel {
  steps: Array<{
    number: number;
    step: string;
  }>;
}

export interface RecipeModel {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  healthScore: number;
  cuisines?: string[];
  diets?: string[];
  extendedIngredients?: IngredientModel[];
  analyzedInstructions?: InstructionModel[];
}

export interface RecipeTasteModel {
  sweetness?: number;
  saltiness?: number;
  sourness?: number;
  bitterness?: number;
  savoriness?: number;
  fattiness?: number;
  spiciness?: number;
}

export interface SimilarRecipeModel {
  id: number;
  title: string;
  readyInMinutes: number;
}

export interface AutocompleteModel {
  id: number;
  title: string;
}

export interface FoodTriviaResponseType {
  text: string;
}
