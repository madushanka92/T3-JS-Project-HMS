import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";

// User
import UserRegistrationForm from "../views/User/user-create";
import UserListPage from "../views/User/user-list";
import UserPage from "../views/UserPage";

// Department
import DepartmentList from "../views/Department/department-list";
import DepartmentForm from "../views/Department/department-create";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/users/create", element: <UserRegistrationForm /> },
  { path: "/users/edit/:userId", element: <UserRegistrationForm /> },
  { path: "/users/list", element: <UserListPage /> },
  { path: "/UserPage", element: <UserPage /> },

  { path: "/departments/list", element: <DepartmentList /> },
  { path: "/departments/create", element: <DepartmentForm /> },
  { path: "/departments/edit/:id", element: <DepartmentForm /> },
];

export default routes;
