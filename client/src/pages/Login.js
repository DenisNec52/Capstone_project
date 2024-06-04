import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/session";
import "../components/FormLayout.css";

const LoginFormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    const response = await dispatch(login(userData));
    if (response?.token) {
      navigate('/'); // Redirect to the home page
    }
  };

  const handleDemoLogin = () => {
    const userData = {
      usernameOrEmail: "john.doe",
      password: "johndoe",
    };
    handleLogin(userData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="Username or Email"
          className={`form__input ${
            errors.usernameOrEmail ? "form__input--error" : ""
          }`}
          {...register("usernameOrEmail", { required: true })}
        />
        {errors.usernameOrEmail && <p className="form__error">Username or Email is required</p>}
        
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${
            errors.password ? "form__input--error" : ""
          }`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password is required</p>}
        
        {sessionError && <p className="form__error">{sessionError}</p>}
        
        <button type="submit" className="form__btn form__btn--submit">
          Log In
        </button>
      </form>
      <button onClick={handleDemoLogin} className="form__btn form__btn--demo">
        Demo
      </button>
      <Link to="/signup">Not on Pinterest yet? Sign up</Link>
    </>
  );
};

export default LoginFormLayout;
