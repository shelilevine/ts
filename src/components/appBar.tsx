import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Box,
  Theme,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { User, Logout } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      opacity: "100%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      align: "center",
      cursor: "pointer",
      fontFamily: "Oswald, sans-serif",
      fontSize: "60px",
      color: "white",
    },
    button: {
      backgroundColor: "white",
      color: "#ec2d01",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    centerBox: {
      flexBasis: 0,
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
    leftBox: {
      flexBasis: 0,
      flexGrow: 1,
    },
    rightBox: {
      flexBasis: 0,
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface Props extends RouteComponentProps<any> {
  user: User;
  logout: Logout;
}

function MenuAppBar(props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
  const open: boolean = Boolean(anchorEl);
  const { user, logout } = props;

  const handleMenu = (event: React.MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "#ec2d01",
        }}
      >
        <Toolbar>
          <Box className={classes.leftBox} />
          <Box className={classes.centerBox}>
            <Typography
              variant="h4"
              className={classes.title}
              onClick={(): void => props.history.push("/")}
            >
              SERV'D
            </Typography>
          </Box>
          {user.id ? (
            <div className={classes.rightBox}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(): void => {
                    handleClose();
                    props.history.push("/myAccount");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(): void => {
                    handleClose();
                    props.history.push("/saved");
                  }}
                >
                  Saved Recipes
                </MenuItem>
                <MenuItem
                  onClick={(): void => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Box className={classes.rightBox}>
              <Button
                variant="outlined"
                size="small"
                onClick={(): void =>
                  props.history.push("/login", props.history.location.pathname)
                }
                className={classes.button}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MenuAppBar);
