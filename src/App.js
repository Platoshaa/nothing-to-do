import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFirebaseAuth from "./hook/useFirebaseAuth";
import { setUser } from "./redux/slices/authSlice";
import "./app.scss";
import { Header } from "./components/Header";
import { Toolbar } from "@mui/material";
import AppRouter from "./components/AppRouter";
import ItemCreator from "./components/ItemCreator";
import Loader from "./components/UI/Loader";

function App() {
  const d = useDispatch();
  const auth = useFirebaseAuth();

  useEffect(() => {
    if (auth) {
      d(setUser({ email: auth.email, token: auth.uid }));
    }
  }, [auth]);
  return (
    <div className="App flow-text">
      <Toolbar />
      {auth !== null ? (
        <>
          <div className="content ">
            <Header width={0} />
            <AppRouter />

            {auth.email && <ItemCreator />}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default App;
