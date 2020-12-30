import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemDetails from "./pages/itemDetails";
import Items from "./pages/items";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import "./assets/flexboxgrid.css";
import Classes from "./app.module.css";

export default function App() {
  return (
    <Router>
      <div className={Classes.app}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/items/:id" component={ItemDetails}></Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
