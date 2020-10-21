import React, { useEffect } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import arrowWood from "../arrowwoodback.jpg";
import {
  CssBaseline,
  Typography,
  Grid,
  Container,
  Box,
  Theme,
  IconButton,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import SingleRecipeIngredients from "./SingleRecipeIngredients";
import SingleRecipeSteps from "./SingleRecipeSteps";
import { AppState, UpdateRecipe } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "Lato, sans serif",
      backgroundImage: `url(${arrowWood})`,
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      backgroundColor: "white",
      borderRadius: "10px",
      opacity: "94%",
      fontFamily: "Lato, sans serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      flexGrow: 1,
      marginLeft: "2%",
      marginTop: "3%",
    },
    title: {
      margin: "1.5%",
    },
    recipeImg: {
      width: "100%",
      marginBottom: "15px",
    },
    recipeImgContainer: {
      display: "flex",
    },
    favoriteStar: {
      marginTop: "2%",
    },
    typography: {
      fontFamily: "Lato, Times, serif",
    },
    servings: {
      marginTop: "4%",
    },
  })
);

interface Props extends RouteComponentProps<any> {
  appState: AppState;
  saveRecipe: UpdateRecipe;
  removeRecipe: UpdateRecipe;
}

export function SingleRecipe(props: Props) {
  const classes = useStyles();
  const recipe = props.location.state || props.appState.singleRecipe;
  const isLoggedIn = !!props.appState.user.id;
  const isSaved =
    props.appState.savedRecipes.filter((saved) => saved.title === recipe.title)
      .length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="md">
        {/* Title */}
        <Grid className={classes.title} spacing={2}>
          <Box className={classes.header}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              className={classes.typography}
            >
              <strong>{recipe.title}</strong>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                className={`${classes.typography} ${classes.servings}`}
              >
                Servings: {recipe.servings}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                className={classes.typography}
              >
                Cook Time: {recipe.time} min.
              </Typography>
            </Typography>

            <div className={classes.favoriteStar}>
              {isLoggedIn && !isSaved ? (
                <IconButton onClick={() => props.saveRecipe(recipe)}>
                  <StarBorderIcon />
                </IconButton>
              ) : null}
              {isLoggedIn && isSaved ? (
                <IconButton onClick={() => props.removeRecipe(recipe)}>
                  <StarIcon />
                </IconButton>
              ) : null}
            </div>
          </Box>
        </Grid>

        {/* Recipe Image */}
        <Grid className={classes.recipeImg}>
          <Container className={classes.recipeImgContainer}>
            <img
              className={classes.recipeImg}
              src={recipe.imgUrl}
              alt={recipe.title}
            />
          </Container>
        </Grid>

        {/* Ingredients*/}
        <SingleRecipeIngredients ingredients={recipe.ingredients} />

        {/* Steps */}
        <SingleRecipeSteps steps={recipe.steps} />
      </Container>
    </div>
  );
}

export default withRouter(SingleRecipe);
