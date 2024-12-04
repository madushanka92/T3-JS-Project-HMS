import "./App.css";
import "./assets/css/Pages.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import LoginPage from "./views/LoginPage";
import appRoutes from "./route";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./route/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Login Page */}
          <Route element={<Layout />}>
            {appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
