import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";
import { appRoutes, publicRoutes } from "@/routes/index";
import AdminLayout from "@/layouts/AdminLayout";
import OtherLayout from "@/layouts/OtherLayout";

const AppRouter = (props) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      {/* Public routes - accessible to all */}
      {publicRoutes.map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            // If user is authenticated and tries to access login/signup, redirect to home
            (route.path === "/auth/login" || route.path === "/auth/signup") &&
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <OtherLayout {...props}>{route.element}</OtherLayout>
            )
          }
        />
      ))}

      {/* Protected routes - require authentication */}
      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            isAuthenticated ? (
              <AdminLayout {...props}>{route.element}</AdminLayout>
            ) : (
              <Navigate
                to={{
                  pathname: "/auth/login",
                  search: `redirectTo=${route.path}`,
                }}
                replace
              />
            )
          }
        />
      ))}

      {/* Optional: Catch-all route */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/" : "/auth/login"} replace />
        }
      />
    </Routes>
  );
};

export default AppRouter;
