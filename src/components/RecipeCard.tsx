import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Theme,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Recipe, User, UpdateRecipe } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "5px",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
      margin: "4%",
    },
    cardContent: {
      flexGrow: 1,
      paddingTop: "20px",
    },
    button: {
      justifyContent: "space-between",
    },
    save: {
      alignSelf: "flex-end",
      justifySelf: "flex-end",
    },
    cardTitle: {
      fontFamily: "Lato, serif",
      textAlign: "center",
    },
  })
);

interface Props extends RouteComponentProps<any> {
  isSaved?: boolean;
  user?: User;
  recipe: Recipe;
  setSingleRecipe: UpdateRecipe;
  saveRecipe: UpdateRecipe;
  removeRecipe: UpdateRecipe;
}

export function RecipeCard(props: Props): JSX.Element {
  const classes = useStyles();
  let { isSaved, user, recipe } = props;
  user = user || {};

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={recipe.imgUrl}
            title={recipe.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.cardTitle}
            >
              {recipe.title}
            </Typography>
          </CardContent>
          <CardActions className={classes.button}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                props.setSingleRecipe(recipe);
                props.history.push("/single-recipe", recipe);
              }}
            >
              View
            </Button>
            {user.id && isSaved ? (
              <Button
                className={classes.save}
                onClick={() => props.removeRecipe(recipe)}
              >
                <StarIcon />
              </Button>
            ) : user.id ? (
              <Button
                className={classes.save}
                onClick={() => props.saveRecipe(recipe)}
              >
                <StarBorderIcon />
              </Button>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(RecipeCard);
