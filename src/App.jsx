import { Fragment, useState } from "react";
import { Toast } from "./components";
import BaseStyles from "./styles/BaseStyles";
import NormalizeStyles from "./styles/NormalizeStyles";

function App() {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <Toast />
      <div>
        <h1>Hello World!</h1>
      </div>
    </Fragment>
  );
}

export default App;
