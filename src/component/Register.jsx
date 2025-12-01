import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password);

    // reset errror and status message
    setErrorMessage("");
    setSuccess(false);

    if (!email || !password) {
      setErrorMessage("Email and password cannot be empty.");
      return;
    }

    // password validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!terms) {
      setErrorMessage("You must accept the terms and conditions.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()\-_=+])[A-Za-z\d@$!%*?&^#()\-_=+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        // send verification email
        sendEmailVerification(result.user)
          .then(() => {
            console.log("Verification email sent.");
          })
          .catch((err) => console.log("Email verify error:", err));
      })
      .catch((error) => {
        console.log("Error creating user:", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="w-full mt-40 ">
      <form
        onSubmit={handleRegister}
        className="card bg-base-400 w-full max-w-sm shrink-0 shadow-xl mx-auto border"
      >
        <div className="card-body">
          <fieldset className="fieldset ">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-xs absolute right-4 top-7 border-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <fieldset className="fieldset bg-base-100 border-base-300 ">
              <label className="label">
                <input type="checkbox" name="terms" className="checkbox" />
                Accept Terms and Conditions
              </label>
            </fieldset>
            <button className="btn btn-neutral mt-4">Register</button>
            <p>
              Already have an account please{" "}
              <Link to="/login" className="text-green-700 font-bold">
                Login
              </Link>
            </p>
          </fieldset>
        </div>
        {errorMessage && <p className="text-red-600 ">{errorMessage}</p>}
        {success && (
          <p className="text-green-600">User registered successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Register;
