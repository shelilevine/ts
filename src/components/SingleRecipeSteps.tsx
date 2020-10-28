import React from "react";
import { Typography, Grid, Container, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      fontFamily: "Lato, Times, serif",
    },
    step: {
      margin: "0 0 0.5rem 1.5rem",
      paddingRight: "2rem",
    },
  })
);

type Props = {
  steps: string[];
};

export default function SingleRecipeSteps(props: Props): JSX.Element {
  const classes = useStyles();
  let { steps } = props;

  return (
    <React.Fragment>
      <Container>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.typography}
        >
          <strong>Preparation</strong>
        </Typography>
      </Container>

      {steps.map((step) => (
        <Grid container item xs={12} key={step} className={classes.step}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className={classes.typography}
          >
            <span>
              <strong>{`Step ${steps.indexOf(step) + 1}: `}</strong>
            </span>
            {step}
          </Typography>
        </Grid>
      ))}
    </React.Fragment>
  );
}
