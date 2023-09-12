import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./Layout/GeneralLayout";
import { AboutUs } from "./Pages/AboutUs";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { Settings } from "./Pages/Settings";
import { routeNames } from "./Routes/routeNames";
import { AddCategory } from "./Pages/Categories/AddCategory";
import ViewCategories from "./Pages/Categories/ViewCategories";
import { AddProduct } from "./Pages/Products/AddProduct";
import Orders from "./Pages/Orders";
import ViewProducts from "./Pages/Products/ViewProducts";
import ViewRevenue from "./Pages/Accounts/Revnue";
import AddExpenses from "./Pages/Accounts/AddExpenses";
import ViewExpenses from "./Pages/Accounts/ViewExpenses";

function App() {
  return (
    <Routes>
      <Route path={routeNames.general.login} element={<Login />} />
      <Route path={routeNames.general.landing} element={<GeneralLayout />}>
        <Route path={routeNames.general.landing} element={<Dashboard />} />
        <Route
          path={routeNames.general.addCategory}
          element={<AddCategory />}
        />
        <Route
          path={routeNames.general.viewCategory}
          element={<ViewCategories />}
        />
        <Route path={routeNames.general.addProduct} element={<AddProduct />} />
        <Route
          path={routeNames.general.viewProducts}
          element={<ViewProducts />}
        />
        <Route path={routeNames.general.orders} element={<Orders />} />
        <Route path={routeNames.general.settings} element={<Settings />} />
        <Route path={routeNames.general.revenue} element={<ViewRevenue />} />
        <Route path={routeNames.general.aboutUs} element={<AboutUs />} />
        <Route path={routeNames.general.viewExpesnes} element={<ViewExpenses />} />
        <Route
          path={routeNames.general.addExpenses}
          element={<AddExpenses />}
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
