import React from "react";
import { Fragment } from "react";
import "./App.css";
import Comments from "./components/Comments/AllComments"
import Header from "./components/Header";

export default function App() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Comments />
      </div>
    </Fragment>
  );
}