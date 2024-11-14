import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";
import UserRegistrationForm from "../views/User/user-create";
import UserListPage from "../views/User/user-list";
import UserPage from "../views/UserPage";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/users/create", element: <UserRegistrationForm /> },
  { path: "/users/edit/:userId", element: <UserRegistrationForm /> },
  { path: "/users/list", element: <UserListPage /> },
  {path:"/UserPage", element:<UserPage/>}
];

export default routes;
