import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/session";
import { FaGoogle } from "react-icons/fa";
import "../components/FormLayout.css";

const LoginFormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Hook useForm per gestire il form

  const dispatch = useDispatch(); // Hook useDispatch per inviare azioni Redux
  const sessionError = useSelector((state) => state.sessionError); // Ottenimento dell'errore di sessione dalla Redux store
  const navigate = useNavigate(); // Hook useNavigate per la navigazione

  // Funzione per gestire il login
  const handleLogin = async (userData) => {
    const response = await dispatch(login(userData)); // Dispatch per eseguire il login
    if (response?.token) {
      navigate('/'); // Redirect alla home page dopo il login
    }
  };

  // Funzione per gestire il login con Google
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google'; // Reindirizzamento alla pagina di login di Google
  };

  // Funzione per eseguire il login con le credenziali di demo
  const handleDemoLogin = () => {
    const userData = {
      usernameOrEmail: "john.doe",
      password: "johndoe",
    };
    handleLogin(userData); // Chiamata alla funzione handleLogin con le credenziali di demo
  };

  return (
    <>
      {/* Form di login */}
      <form onSubmit={handleSubmit(handleLogin)}>
        {/* Campo per inserire username o email */}
        <input
          type="text"
          placeholder="Username or Email"
          className={`form__input ${errors.usernameOrEmail ? "form__input--error" : ""}`}
          {...register("usernameOrEmail", { required: true })}
        />
        {errors.usernameOrEmail && <p className="form__error">Username or Email is required</p>}
        
        {/* Campo per inserire la password */}
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${errors.password ? "form__input--error" : ""}`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password is required</p>}
        
        {/* Visualizzazione dell'errore di sessione */}
        {sessionError && <p className="form__error">{sessionError}</p>}
        
        {/* Pulsante di submit per eseguire il login */}
        <button type="submit" className="form__btn form__btn--submit">
          Log In
        </button>
      </form>

      {/* Pulsante per eseguire il login con le credenziali di demo */}
      <button onClick={handleDemoLogin} className="form__btn form__btn--demo">
        Demo
      </button>

      {/* Pulsante per eseguire il login con Google */}
      <button onClick={handleGoogleLogin} className="form__btn form__btn--google">
        <FaGoogle style={{ marginRight: '8px' }} /> Login with Google
      </button>

      {/* Link per registrarsi */}
      <Link to="/signup">Not on Pinterest yet? Sign up</Link>
    </>
  );
};

export default LoginFormLayout;
