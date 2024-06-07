import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import FormLayout from "./components/FormLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import { RequireAuth, NotRequireAuth } from "./routes/routes";
import UploadPostForm from "./components/UploadPostForm";
import ProfileSettings from './components/ProfileSettings';
import PostSettings from './components/PostSettings';
import SecuritySettings from './components/SecuritySettings';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import DeleteAccount from './components/DeleteAccount';

const HandleToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [navigate]);

  return null; // Non restituisce nulla visivamente
};

const App = () => {
  return (
    <BrowserRouter>
      <HandleToken />
      <Routes>
        <Route element={<FormLayout />}>
          <Route
            path="/login"
            element={
              <NotRequireAuth>
                <Login />
              </NotRequireAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <NotRequireAuth>
                <Signup />
              </NotRequireAuth>
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <>
                <NavBar />
                <Profile />
              </>
            </RequireAuth>
          }
        />
        <Route
          path="/search/:query"
          element={
            <RequireAuth>
              <>
                <NavBar />
                <Search />
              </>
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <>
                <NavBar />
                <Home />
              </>
            </RequireAuth>
          }
        />
        <Route 
          path="/upload" 
          element={ 
            <RequireAuth>
              <>
                <NavBar />
                <UploadPostForm />
              </>
            </RequireAuth>
          } 
        />
        <Route 
          path="/settings/*" 
          element={ 
            <RequireAuth>
              <>
                <NavBar />
                <Settings />
              </>
            </RequireAuth>
          } 
        >
          <Route 
            path="profile" 
            element={ 
              <RequireAuth>
                <ProfileSettings />
              </RequireAuth>
            } 
          />
          <Route 
            path="posts" 
            element={ 
              <RequireAuth>
                <PostSettings />
              </RequireAuth>
            } 
          />
          <Route 
            path="security" 
            element={ 
              <RequireAuth>
                <SecuritySettings />
              </RequireAuth>
            } 
          />
          <Route 
            path="delete-account" 
            element={ 
              <RequireAuth>
                <DeleteAccount />
              </RequireAuth>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
