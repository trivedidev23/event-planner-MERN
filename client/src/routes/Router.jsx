import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const EventList = lazy(() => import("../pages/event/EventList"));
const EventDetail = lazy(() => import("../pages/event/EventDetail"));
const EventRegister = lazy(() => import("../pages/event/EventRegister"));
import Loader from "../components/loader/Loader";
const Router = () => {
  const routes = [
    { path: "/", element: <EventList />, isPublic: false },
    { path: "/register", element: <Register />, isPublic: true },
    { path: "/login", element: <Login />, isPublic: true },
    { path: "/add-event", element: <EventRegister />, isPublic: false },
    { path: "/edit-event/:id", element: <EventRegister />, isPublic: false },
    { path: "/event-detail/:id", element: <EventDetail />, isPublic: false },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes?.map((route) => {
          return (
            <Route
              path={route?.path}
              element={
                route?.isPublic ? (
                  route?.element
                ) : (
                  <PrivateRoute>{route?.element}</PrivateRoute>
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default Router;
