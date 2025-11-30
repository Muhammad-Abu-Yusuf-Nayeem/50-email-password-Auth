import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";

const Register = () => {
  const [success, setSuccess] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset errror and status message
    setErrorMessage("");
    setSuccess(false); 

    // password validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
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
        className="card bg-base-400 w-full max-w-sm shrink-0 shadow-xl mx-auto border-2"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </div>
        {errorMessage && <p className="text-red-600 ">{errorMessage}</p>}
        {success && <p className="text-green-600">User registered successfully!</p>}
      </form>
    </div>
  );
};

export default Register;
