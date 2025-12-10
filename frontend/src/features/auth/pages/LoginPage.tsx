import { useState } from 'react';
import '../Auth.css'; // Import the styles we just created

export const LoginPage = () => {
  // Logic: Replaces script.js
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterActive(true);
  };

  const handleLoginClick = () => {
    setIsRegisterActive(false);
  };

  return (
    <div classname="auth-wrapper"> {/* Renamed body style to a wrapper div */}
      <div className={`container ${isRegisterActive ? 'active' : ''}`} id="container">
        
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>

            <span>use your email password</span>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot Your Password?</a>
            <button>Login</button>
          </form>
        </div>

        {/* Toggle Overlay */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                Login
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register" onClick={handleRegisterClick}>
                Register
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};