import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../firebase.init";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log("Error creating user:", error);
    });
  };
  return (
    <div className="w-full mt-40">
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
      </form>
    </div>
  );
};

export default Register;
