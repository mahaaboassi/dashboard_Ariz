import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index"
import SignIn from "./pages/auth/signin";
import Layout from "./pages/layout/page";
import Store from "./pages/proposals/page";
import Template from "./pages/template/page";
import LayoutMarketing from "./pages/marketingPages/layout";
import ReviewPages from "./pages/marketingPages/reviewPages";
import Signup from "./test";
import LayoutAuth from "./pages/auth/layout";
import SignUp from "./pages/auth/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*"  element={<LayoutAuth/>} >
          <Route path="" element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
        </Route>
        <Route element={<Layout/>} path="/dashboard/*">
          
          <Route element={<Store/>} path="" />
          <Route element={<ReviewPages/>} path="review/:id"/>
          <Route element={<Template/>} path="proposal/:id" >
            <Route element={<LayoutMarketing/>} path="page/:idPage" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
