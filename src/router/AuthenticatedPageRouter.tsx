import { Page404 } from "../component/pages/Page404";
import { AuthenticatedPage } from "../component/pages/AuthenticatedPage";

export const AuthenticatedPageRoutes = [
  { path: "", exact: true, children: <AuthenticatedPage /> },
  { path: "*", exact: false, children: <Page404 /> },
];
