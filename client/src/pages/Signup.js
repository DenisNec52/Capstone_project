import React from "react";
import { useForm } from "react-hook-form"; // Importazione del hook useForm per la gestione del form
import { useDispatch, useSelector } from "react-redux"; // Importazione dei hooks useDispatch e useSelector per la gestione dello stato Redux
import { Link, useNavigate } from "react-router-dom"; // Importazione del hook useNavigate per la navigazione e del componente Link per i link
import { signup } from "../actions/session"; // Importazione dell'azione per la registrazione dell'utente
import { FaGoogle } from "react-icons/fa"; // Importazione dell'icona di Google
import "../components/FormLayout.css"; // Importazione del file CSS per lo stile del form

const SignupFormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Ottieni eventuali errori dal form
  } = useForm(); // Utilizzo del hook useForm per la gestione del form

  const dispatch = useDispatch(); // Utilizzo del hook useDispatch per inviare azioni Redux
  const sessionError = useSelector((state) => state.sessionError); // Ottenimento dell'errore di sessione dalla Redux store
  const navigate = useNavigate(); // Utilizzo del hook useNavigate per la navigazione

  // Funzione per la gestione della registrazione dell'utente
  const handleSignup = async (userData) => {
    const response = await dispatch(signup(userData)); // Invia l'azione di registrazione con i dati dell'utente
    if (response?.token) {
      navigate('/'); // Reindirizza alla home page se la registrazione è avvenuta con successo
    }
  };

  // Funzione per la registrazione tramite Google
  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3001/auth/google'; // Reindirizza alla pagina di registrazione di Google
  };

  return (
    <>
      {/* Form per la registrazione */}
      <form onSubmit={handleSubmit(handleSignup)}>
        {/* Input per l'inserimento del nome utente */}
        <input
          type="text"
          placeholder="Username"
          className={`form__input ${errors.username ? "form__input--error" : ""}`}
          {...register("username", { required: true })}
        />
        {/* Mostra un messaggio di errore se il campo è vuoto */}
        {errors.username && <p className="form__error">Username is required</p>}
        
        {/* Input per l'inserimento dell'email */}
        <input
          type="email"
          placeholder="Email"
          className={`form__input ${errors.email ? "form__input--error" : ""}`}
          {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
        />
        {/* Mostra un messaggio di errore se il campo è vuoto o l'email non è valida */}
        {errors.email && <p className="form__error">Valid email is required</p>}
        
        {/* Input per l'inserimento del nome */}
        <input
          type="text"
          placeholder="Name"
          className={`form__input ${errors.name ? "form__input--error" : ""}`}
          {...register("name", { required: true })}
        />
        {/* Mostra un messaggio di errore se il campo è vuoto */}
        {errors.name && <p className="form__error">Name is required</p>}
        
        {/* Input per l'inserimento della password */}
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${errors.password ? "form__input--error" : ""}`}
          {...register("password", { required: true })}
        />
        {/* Mostra un messaggio di errore se il campo è vuoto */}
        {errors.password && <p className="form__error">Password is required</p>}
        
        {/* Mostra un messaggio di errore se si verificano errori durante la registrazione */}
        {sessionError && <p className="form__error">{sessionError}</p>}
        
        {/* Bottone per la registrazione */}
        <button className="form__btn form__btn--submit" type="submit">
          Sign Up
        </button>
      </form>

      {/* Bottone per la registrazione tramite Google */}
      <button onClick={handleGoogleSignUp} className="form__btn form__btn--google">
        <FaGoogle style={{ marginRight: '8px' }} /> Sign Up with Google
      </button>

      {/* Link per il login */}
      <Link to="/login">Already a member? Log in</Link>
    </>
  );
};

export default SignupFormLayout;
