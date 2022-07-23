import { Route, Routes } from "react-router-dom";
import { Login } from "../component/pages/Login";
import { Page404 } from "../component/pages/Page404";
import { AuthenticatedPageRoutes } from "../router/AuthenticatedPageRouter";

export const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Login />}></Route>
      <Route path="*" element={<Page404 />}></Route>
      <Route path="/AuthenticatedPage">
        {AuthenticatedPageRoutes.map((route) => (
          <Route
            key={route.path}
            path={`${route.path}`}
            element={route.children}
          />
        ))}
      </Route>
    </Routes>
  );
};
