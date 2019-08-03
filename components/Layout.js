//import "semantic-ui-css/semantic.min.css";
import React from "react";
import Header from "./Header";

export default props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
