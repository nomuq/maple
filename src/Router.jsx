import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { PageLoader } from "./components";
import Dashboard from "./pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserService } from "./services/UserService";
import toast from "./utils/toast";

export default function Router() {
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        (async () => {
          try {
            await UserService.getInstance().updateUser();
            setIsLoading(false);
            setIsAuthenticated(true);
          } catch (error) {
            toast.error(error.message);
          }
        })();
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    });
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
