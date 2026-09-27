import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [user, setUser] = useState(null);

  
  // SHOW MESSAGE


  const showMessage = (message, type = "error") => {
    setMessage(message);
    setMessageType(type);
  };


  // EMAIL VALIDATION


  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };


  // PASSWORD STRENGTH
  

  const getPasswordStrength = () => {
    if (!password) {
      return "";
    }

    if (password.length < 6) {
      return "Weak";
    }

    if (password.length < 10) {
      return "Medium";
    }

    return "Strong";
  };


  // REGISTER


  const register = async (e) => {
    e.preventDefault();

    // Name validation
    if (!name.trim()) {
      showMessage("Name is required.");
      return;
    }

    // Email validation
    if (!email.trim()) {
      showMessage("Email is required.");
      return;
    }

    if (!email.includes("@")) {
      showMessage("Email must contain @.");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!password) {
      showMessage("Password is required.");
      return;
    }

    if (password.length < 6) {
      showMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }
      );

      console.log("REGISTER RESPONSE:", response.data);

      showMessage(
        "Account created successfully! Please login.",
        "success"
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setPage("login");
        setMessage("");
      }, 1500);

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      if (error.response) {
        showMessage(error.response.data.message);
      } else {
        showMessage(
          "Cannot connect to ScenePass backend."
        );
      }
    }

    setLoading(false);
  };

 
  // LOGIN
  

  const login = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email.trim()) {
      showMessage("Email is required.");
      return;
    }

    if (!email.includes("@")) {
      showMessage("Email must contain @.");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!password) {
      showMessage("Password is required.");
      return;
    }

    if (password.length < 6) {
      showMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: email.trim().toLowerCase(),
          password: password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data.success) {
        setUser(response.data.user);

        setMessage("");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        showMessage(error.response.data.message);
      } else {
        showMessage(
          "Cannot connect to ScenePass backend."
        );
      }
    }

    setLoading(false);
  };

 
  // LOGOUT


  const logout = () => {
    setUser(null);

    setName("");
    setEmail("");
    setPassword("");

    setMessage("");
    setPage("login");
  };

 
  // DASHBOARD


  if (user) {
    return (
      <div className="login-page">

        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="orb orb-three"></div>

        <div className="login-card dashboard-card">

          <div className="brand">

            <div className="logo">
              <div className="logo-frame">
                <div className="logo-eye"></div>
              </div>
            </div>

            <h1>Welcome!</h1>

            <p>
              You have successfully entered ScenePass.
            </p>

          </div>

          <div className="user-info">

            <div className="user-avatar">
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2>{user.name}</h2>

              <p>{user.email}</p>
            </div>

          </div>

          <div className="dashboard-box">

            <span>✓</span>

            <div>
              <h3>Access Granted</h3>

              <p>
                Your ScenePass account is active.
              </p>
            </div>

          </div>

          <button className="login-btn" onClick={logout}>
            Logout
          </button>

        </div>

      </div>
    );
  }


  // LOGIN / REGISTER PAGE
 

  return (
    <div className="login-page">

      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      <div className="orb orb-three"></div>

      <div className="login-card">

        {/* BRAND */}

        <div className="brand">

          <div className="logo">

            <div className="logo-frame">
              <div className="logo-eye"></div>
            </div>

          </div>

          <h1>ScenePass</h1>

          <p>
            Your secure pass to every scene.
          </p>

        </div>

        {/* MESSAGE */} 

        {message && (
          <div className={`form-message ${messageType}`}>
            {message}
          </div>
        )}

        {/*LOGIN*/}

        {page === "login" && (

          <form onSubmit={login}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input type="text" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setMessage(""); }}/>

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ◆
                </span>

                <input type={ showPassword ? "text" : "password" } placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setMessage(""); }}/>

                <button type="button" className="show-password" onClick={() => setShowPassword( !showPassword )}>
                   {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {/* PASSWORD STRENGTH */}

              {password && (
                <div className="strength-area">

                  <div className="strength-bar">

                    <div className={`strength-fill ${getPasswordStrength().toLowerCase()}`}></div>

                  </div>

                  <p className={`strength-text ${getPasswordStrength().toLowerCase()}`} >
                    {getPasswordStrength()} password
                  </p>

                </div>
              )}

            </div>

            {/* LOGIN BUTTON */}

            <button type="submit" className="login-btn" disabled={loading}>

              {loading ? "Checking..." : "Enter ScenePass →"}

            </button>

            {/* REGISTER LINK */}

            <p className="switch-text">

              Don't have an account?

              <button type="button" onClick={() => { setPage("register"); setMessage(""); setPassword(""); }}>
                Create Account
              </button>

            </p>

          </form>

        )}

        {/*REGISTER*/}

        {page === "register" && (

          <form onSubmit={register}>

            {/* NAME */}

            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✦
                </span>

                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value); setMessage(""); }} />

              </div>

            </div>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input type="text" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setMessage(""); }} />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>Create Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ◆
                </span>

                <input type={ showPassword ? "text" : "password" } placeholder="Create a password" value={password} onChange={(e) => { setPassword(e.target.value); setMessage(""); }} />

                <button type="button" className="show-password" onClick={() => setShowPassword( !showPassword )} > {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {/* PASSWORD STRENGTH */}

              {password && (
                <div className="strength-area">

                  <div className="strength-bar">

                    <div className={`strength-fill ${getPasswordStrength().toLowerCase()}`}></div>

                  </div>

                  <p className={`strength-text ${getPasswordStrength().toLowerCase()}`}>
                    {getPasswordStrength()} password
                  </p>

                </div>
              )}

            </div>

            {/* REGISTER BUTTON */}

            <button type="submit" className="login-btn" disabled={loading}>

              {loading ? "Creating..." : "Create ScenePass →"}

            </button>

            {/* LOGIN LINK */}

            <p className="switch-text">

              Already have an account?

              <button type="button" onClick={() => { setPage("login"); setMessage(""); setName(""); setPassword(""); }} >
                Login
              </button>

            </p>

          </form>

        )}

        {/* FOOTER */}

        <div className="secure-note">

          <span>✦</span>

          Secure access powered by ScenePass

        </div>

      </div>

    </div>
  );
}

export default App;