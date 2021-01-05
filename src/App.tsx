import React, { useEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getItems } from "./redux/actions/shoesActions";
import Main from "./pages/Main";
import CartDetails from "./pages/Checkout";
import MainTemplate from "./layouts/MainTemplate";
import ItemDetailsTemplate from "./pages/ItemDetailsTemplate";
import "./App.scss";

const App: React.FC = ({ getItems }: any) => {
  useEffect(() => {
    getItems(1, 9);
  }, [getItems]);

  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/items/:id" component={ItemDetailsTemplate} />
          <Route exact path="/cart" component={CartDetails} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: (page: number, limit: number) => dispatch(getItems(page, limit)),
  };
};

export default connect(null, mapDispatchToProps)(App);
