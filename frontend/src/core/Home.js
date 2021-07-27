import React from "react";
import { API } from "../Backend";
import Base from "./base/Base";
const Home = () => {
  console.log(API);
  return (
    <div>
      <Base
        heading="Home Page"
        description="This is home page"
        footer="If you got any question feel free to reach out"
      >
        <h1>Children</h1>
      </Base>
    </div>
  );
};

export default Home;
