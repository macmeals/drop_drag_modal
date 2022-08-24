import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../component/pages/Login";
import { Page404 } from "../component/pages/Page404";
import { AuthenticatedPageRoutes } from "../router/AuthenticatedPageRouter";
import { useContext } from "react";

// グローバルStateに格納したJWT認証のアクセストークンをインポート
import { TokenContext } from "../component/provider/dropDragProvider";

export const Router = () => {
  const { accessToken } = useContext(TokenContext);
  return (
    <Routes>
      <Route path="" element={<Login />}>
        {/* //アクセストークンがあった場合、/AuthenticatedPageへリダイレクトされる  */}
        {accessToken ? (
          <Route
            path=""
            element={<Navigate to="/AuthenticatedPage" replace />}
          />
        ) : (
          <Route path="" element={<Login />} />
        )}
      </Route>
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
