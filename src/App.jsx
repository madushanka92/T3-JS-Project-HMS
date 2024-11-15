import "./App.css";
import "./assets/css/Pages.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import LoginPage from "./views/LoginPage";
import appRoutes from "./route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page */}
        <Route element={<Layout />}>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
