
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import store from "./store/store";
import { loadUser } from "./actions/auth";
import Page from "./components/Layout/Page";
import Login from "./components/Login";
import { NavBarCustumer, DrawnerCustumer } from "./components/Layout/Layout";
import "./App.css";
import { cssVariables, theme } from "./theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    zIndex: 1,
    overflow: "hidden",
    fontFamily: theme.fontFamily,
    backgroundColor: "#edf1f6"
  },
  appFrame: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  content: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "92vh",
    overflowY: "auto",
    marginTop: 48,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
}));

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={{ ...theme, ...cssVariables }}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <NavBarCustumer open={open} setOpen={setOpen} />
              <DrawnerCustumer open={open} setOpen={setOpen} />
              <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/admin" component={Page} />
                </Switch>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;