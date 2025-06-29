import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthProvider";
import httpService from "./api/httpService";
import MainLayout from "./components/MainLayout";
import GamePage from "./pages/game/GamePage";
import GamesPage from "./pages/games/GamesPage";
import CreatePage from "./pages/create/CreatePage";
import ErrorPage from "./pages/ErrorPage";
// REMOVE ME
import TestComponent from "./components/TestComponent";

const App = () => {
  const { setAccessToken, setAppUser, setLoadingAppUser } = useAuth();

  useEffect(() => {
    initUserData();
  }, []);

  const initUserData = async () => {
    setLoadingAppUser(true);
    try {
      const response = await httpService.get("/init");
      const { user, token } = response.data;
      setAccessToken(token);
      setAppUser(user);
    } catch {
      setAccessToken(null);
      setAppUser(null);
    } finally {
      setLoadingAppUser(false);
    }
  };

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
