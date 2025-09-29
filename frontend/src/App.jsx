import React from "react";
import { Navigate, Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.jsx";
import MyFriendPage from "./pages/MyFriendPage.jsx";
import { LayoutTemplate } from "lucide-react";

const App = () => {
  //tanstack query
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const {theme} = useThemeStore();

  if (isLoading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return (
    <div data-theme={theme}>
      
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>
            )
          }
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (<CallPage/>): (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ): (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <MyFriendPage/>
              </Layout>
            ) : (!isAuthenticated ? "/login" : "/onboarding")
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
