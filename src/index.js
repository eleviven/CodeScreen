import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import "./assets/scss/style.scss";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/php/php";
import "codemirror/mode/python/python";
import "codemirror/mode/sass/sass";
import "codemirror/mode/css/css";
import "codemirror/mode/dart/dart";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);
