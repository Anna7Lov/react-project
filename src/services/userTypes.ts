import { RecipeTitleModel } from "./recipesTypes";

export interface UserModel {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    favouriteRecipes: RecipeTitleModel[];
}

