import { Fragment, useState } from "react";
import BaseStyles from "./styles/BaseStyles";
import NormalizeStyles from "./styles/NormalizeStyles";

function App() {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <div>
        <h1>Hello World!</h1>
      </div>
    </Fragment>
  );
}

export default App;
