export interface RecipeTitleModel {
  id: string;
  title: string;
  image: string;
  imageType: string;
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
  id: string;
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

export type RecipeResponseType = RecipeModel;
