import HomePage from "../views/HomePage";
import ProfilePage from "../views/ProfilePage";

// User
import UserRegistrationForm from "../views/User/user-create";
import UserListPage from "../views/User/user-list";
import UserPage from "../views/UserPage";

// Department
import DepartmentList from "../views/Department/department-list";
import DepartmentForm from "../views/Department/department-create";

// Patient
import PatientListPage from "../views/Patient/patient-list";
import PatientForm from "../views/Patient/patient-create";

// Roles
import RolesPage from "../views/Roles/roles";

// Rooms
import RoomList from "../views/Room/room-list";
import RoomForm from "../views/Room/room-create";

// Features
import FeaturePage from "../views/Features/features";
import FeatureMappingPage from "../views/Features/featureMapping";

// Admissions
import AdmissionCreateForm from "../views/Admission/admission-create";
import AdmissionList from "../views/Admission/admission-list";

const routes = [
  { path: "/home", element: <HomePage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/users/create", element: <UserRegistrationForm /> },
  { path: "/users/edit/:userId", element: <UserRegistrationForm /> },
  { path: "/users/list", element: <UserListPage /> },
  { path: "/UserPage", element: <UserPage /> },

  { path: "/departments/list", element: <DepartmentList /> },
  { path: "/departments/create", element: <DepartmentForm /> },
  { path: "/departments/edit/:id", element: <DepartmentForm /> },

  { path: "/patients/list", element: <PatientListPage /> },
  { path: "/patients/create", element: <PatientForm /> },
  { path: "/patients/edit/:id", element: <PatientForm /> },

  { path: "/roles", element: <RolesPage /> },

  { path: "/rooms/list", element: <RoomList /> },
  { path: "/rooms/create", element: <RoomForm /> },
  { path: "/rooms/edit/:id", element: <RoomForm /> },

  { path: "/feature/list", element: <FeaturePage /> },
  { path: "/feature/create", element: <FeaturePage /> },
  { path: "/feature/edit/:id", element: <FeaturePage /> },

  { path: "/featureMapping/list", element: <FeatureMappingPage /> },
  { path: "/featureMapping/create", element: <FeatureMappingPage /> },
  { path: "/featureMapping/edit/:id", element: <FeatureMappingPage /> },

  { path: "/admissions/create", element: <AdmissionCreateForm /> },
  { path: "/admissions/edit/:id", element: <AdmissionCreateForm /> },
  { path: "/admissions/list", element: <AdmissionList /> },
];

export default routes;
