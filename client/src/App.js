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

// Componente per gestire il token ottenuto dalla query string dell'URL
const HandleToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Estrai il token dalla query string dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    // Se il token è presente, salvalo nello storage locale e reindirizza alla home
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [navigate]);

  return null; // Non restituisce nulla visivamente
};

// Componente principale dell'applicazione
const App = () => {
  return (
    <BrowserRouter>
      {/* Componente per gestire il token */}
      <HandleToken />
      {/* Definizione delle rotte dell'applicazione */}
      <Routes>
        {/* Rotte per l'autenticazione */}
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
        {/* Rotte per le pagine protette */}
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
        {/* Rotte per la gestione delle pagine */}
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
