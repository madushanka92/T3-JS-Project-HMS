// src/appRoutes.js
import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
];

export default routes;
