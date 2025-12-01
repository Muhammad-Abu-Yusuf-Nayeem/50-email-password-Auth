import { useRef, useState } from "react";
import { auth } from "../firebase.init";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();

  const handleForgetPassword = () => {
    // Forget password logic goes here
    console.log("Forget password clicked", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent. Please check your inbox.");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
        });
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset success status message
    setSuccess(false);
    setLoginError("");

    // Login user logic goes here
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login successful:", user);
        setSuccess(true);
        if (user.emailVerified) {
          console.log("Email is verified.");
        } else {
          console.log("Email is not verified.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        setLoginError(errorMessage);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-40 border">
      <div className="card-body">
        <form action="" onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              ref={emailRef}
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
            <div onClick={handleForgetPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          {success && (
            <p className="text-green-500 mt-4 font-bold">Login successful!</p>
          )}
          {loginError && (
            <p className="text-red-500 mt-4 font-bold">{loginError}</p>
          )}
          <p>
            New to this site please{" "}
            <Link to="/register" className="text-blue-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
