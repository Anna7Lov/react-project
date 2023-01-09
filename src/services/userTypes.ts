import { RecipeTitleModel } from "./recipesTypes";

export interface UserModel {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    favoriteRecipes: RecipeTitleModel[];
    theme: string
}

