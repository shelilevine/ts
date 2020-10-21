import { User, Recipe } from "./index";

export default interface AppState {
  user: User;
  savedRecipes: Recipe[];
  search: Recipe[];
  singleRecipe: Recipe;
}
