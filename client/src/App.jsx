import React from "react";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";

const App = () => {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <Router />
      </div>
    </>
  );
};

export default App;
