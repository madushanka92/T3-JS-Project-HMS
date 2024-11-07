// src/appRoutes.js
import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";
import UserPage from "../views/UserPage";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
  {path:"/UserPage", element:<UserPage/>}
];

export default routes;
