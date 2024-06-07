import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../actions/session";
import { FaGoogle } from "react-icons/fa";
import "../components/FormLayout.css";

const SignupFormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    const response = await dispatch(signup(userData));
    if (response?.token) {
      navigate('/'); // Redirect to the home page
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
        <input
          type="text"
          placeholder="Username"
          className={`form__input ${errors.username ? "form__input--error" : ""}`}
          {...register("username", { required: true })}
        />
        {errors.username && <p className="form__error">Username is required</p>}
        
        <input
          type="email"
          placeholder="Email"
          className={`form__input ${errors.email ? "form__input--error" : ""}`}
          {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
        />
        {errors.email && <p className="form__error">Valid email is required</p>}
        
        <input
          type="text"
          placeholder="Name"
          className={`form__input ${errors.name ? "form__input--error" : ""}`}
          {...register("name", { required: true })}
        />
        {errors.name && <p className="form__error">Name is required</p>}
        
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${errors.password ? "form__input--error" : ""}`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password is required</p>}
        
        {sessionError && <p className="form__error">{sessionError}</p>}
        
        <button className="form__btn form__btn--submit" type="submit">
          Sign Up
        </button>
      </form>
      <button onClick={handleGoogleSignUp} className="form__btn form__btn--google">
        <FaGoogle style={{ marginRight: '8px' }} /> Sign Up with Google
      </button>
      <Link to="/login">Already a member? Log in</Link>
    </>
  );
};

export default SignupFormLayout;
