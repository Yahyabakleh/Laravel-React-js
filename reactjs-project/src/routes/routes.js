import Dashboard from "../components/admin/Dashboard";
// import Profile from "../components/admin/Profile";
import AdminShow from "../components/admin/Admin/AdminShow";
import AdminAdd from "../components/admin/Admin/AdminAdd";
import AdminEdit from "../components/admin/Admin/AdminEdit";
import ShowEmployee from "../components/admin/Employee/ShowEmployee";
import AddEmployee from "../components/admin/Employee/AddEmployee";
import ShowOrder from "../components/admin/Orders/ShowOrder";
import ViewOrder from "../components/admin/Orders/ViewOrder";
import EditEmployee from "../components/admin/Employee/EditEmployee";
import ShowAdminOrder from "../components/admin/Orders_admin/ShowAdminOrder";
import ViewAdminOrder from "../components/admin/Orders_admin/ViewAdminOrder";
import Showlog from "../components/admin/log/showlog";
const routes = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/admin/log",
    exact: true,
    name: "Showlog",
    component: Showlog
  },
  {
    path: "/admin/employee/show",
    exact: true,
    name: "ShowEmployee",
    component: ShowEmployee
  },
  {
    path: "/admin/employee/add",
    exact: true,
    name: "AddEmployee",
    component: AddEmployee
  },

  {
    path: "/admin/admins/show",
    exact: true,
    name: "AdminShow",
    component: AdminShow
  },
  {
    path: "/admin/employee/edit/:id",
    exact: true,
    name: "EditEmployee",
    component: EditEmployee
  },
  {
    path: "/admin/admins/add",
    exact: true,
    name: "AdminAdd",
    component: AdminAdd
  },
  {
    path: "/admin/admins/edit/:id",
    exact: true,
    name: "AdminEdit",
    component: AdminEdit
  },

  {
    path: "/admin/orders/show",
    exact: true,
    name: "ShowOrder",
    component: ShowOrder
  },
  {
    path: "/admin/admin-orders/show",
    exact: true,
    name: "ShowAdminOrder",
    component: ShowAdminOrder
  },
  {
    path: "/admin/orders/view/:id",
    exact: true,
    name: "ViewOrder",
    component: ViewOrder
  },
  {
    path: "/admin/admin-orders/view/:id",
    exact: true,
    name: "ViewAdminOrder",
    component: ViewAdminOrder
  }
];

export default routes;
