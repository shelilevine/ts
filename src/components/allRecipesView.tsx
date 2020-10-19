import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AllRecipesRender from "./allRecipesRender";
import { UpdateRecipe, SetSearch, Recipe, User } from "../interfaces";

const serverUrl: string = "/api/recipes";

interface Props extends RouteComponentProps<any> {
  search: Recipe[];
  setSingleRecipe: (recipe: Recipe | {}) => void;
  setSearchResults: SetSearch;
  saveRecipe: UpdateRecipe;
  removeRecipe: UpdateRecipe;
  savedRecipes: Recipe[];
  user: User;
}

export function AllRecipesView(props: Props) {
  const [isLoading, setLoadStatus] = useState<boolean>(true);

  useEffect(() => {
    if (props.location.state && !props.search.length) {
      props.setSingleRecipe({});
      getSearchResults();
    }
  }, []);

  async function getSearchResults(): Promise<void> {
    window.scrollTo(0, 0);
    const ingredient: string = props.location.state.ingredient;
    const { data }: { data: Recipe[] } = await axios.get(serverUrl, {
      params: {
        ingredients: ingredient,
      },
      withCredentials: false,
    });
    props.setSearchResults(data);
    setLoadStatus(false);
  }

  return (
    <AllRecipesRender
      recipes={props.search}
      user={props.user}
      savedRecipes={props.savedRecipes}
      saveRecipe={props.saveRecipe}
      removeRecipe={props.removeRecipe}
      setSingleRecipe={props.setSingleRecipe}
      isLoading={isLoading}
      refresh={getSearchResults}
    />
  );
}

export default withRouter(AllRecipesView);
