import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";
import UserRegistrationForm from "../views/User/user-create";
import UserListPage from "../views/User/user-list";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/users/create", element: <UserRegistrationForm /> },
  { path: "/users/edit/:userId", element: <UserRegistrationForm /> },
  { path: "/users/list", element: <UserListPage /> },
];

export default routes;
