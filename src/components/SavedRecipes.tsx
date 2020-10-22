import React from "react";
import RecipeCard from "./RecipeCard";
import { Grid, Container, Box, Typography, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Recipe, UpdateRecipe } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    results: {
      alignContent: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      textAlign: "center",
      noWrap: "true",
      color: "white",
      fontFamily: "Oswald, sans-serif",
      marginBottom: "30px",
      marginTop: "10px",
    },
  })
);

type Props = {
  recipes: Recipe[];
  setSingleRecipe: UpdateRecipe;
  removeRecipe: UpdateRecipe;
  saveRecipe: UpdateRecipe;
};

const SavedRecipes = (props: Props) => {
  const classes = useStyles();
  const { recipes, setSingleRecipe, saveRecipe, removeRecipe } = props;

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {recipes.length ? (
            <Box className={classes.results}>
              <Typography variant="h3" color="inherit" className={classes.text}>
                SAVED RECIPES
              </Typography>
            </Box>
          ) : (
            <Box className={classes.results}>
              <Typography variant="h3" color="inherit" className={classes.text}>
                NO SAVED RECIPES <br />
              </Typography>
            </Box>
          )}
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe.title}
                setSingleRecipe={setSingleRecipe}
                removeRecipe={removeRecipe}
                saveRecipe={saveRecipe}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default SavedRecipes;
