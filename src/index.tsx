import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { useLayoutEffect } from "react";

import "./index.css";
import App from "./App";
import store from "./store";

interface childrenProps {
  children: JSX.Element;
}

const container: HTMLElement | null = document.getElementById("root");
const root = createRoot(container!);

const Wrapper = ({ children }: childrenProps) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper>
        <App />
      </Wrapper>
    </BrowserRouter>
  </Provider>
);
