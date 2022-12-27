import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";
import StudentRoutes from "./students";
import LoginRoutes from "./login";

function App() {
  return (
    <>
      <Routes>
          <Route index element={<LoginRoutes />}/>
          <Route path={"/auth/*"} element={<LoginRoutes />}/>
          <Route path={"/students/*"} element={<StudentRoutes />}></Route>
      </Routes>
    </>
  );
}

export default App;
