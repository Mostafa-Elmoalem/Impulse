import { useState } from 'react';
import { loginWithEmail, registerWithEmail } from '../api/authApi';
import '../Auth.css';

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);

  // States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Login:", { email: loginEmail, password: loginPassword });
      await loginWithEmail({ email: loginEmail, password: loginPassword });
      alert("Login Successful!");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  // Register Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Register:", { name: regName, email: regEmail, password: regPassword });
      await registerWithEmail({ name: regName, email: regEmail, password: regPassword });
      alert("Registration Successful!");
      setIsActive(false);
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`login-container ${isActive ? "active" : ""}`} id="container">
        
        {/* --- Sign Up Form --- */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            {/* نص بديل ومبسط لملء الفراغ */}
            <span>Register with your personal details</span>
            
            <input 
              type="text" placeholder="Name" required 
              value={regName} onChange={(e) => setRegName(e.target.value)}
            />
            <input 
              type="email" placeholder="Email" required 
              value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="Password" required 
              value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* --- login Form --- */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>login</h1>
            {/* نص بديل ومبسط */}
            <span>login using your email and password</span>
            
            <input 
              type="email" placeholder="Email" required 
              value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="Password" required 
              value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a href="#">Forgot Your Password?</a>
            <button type="submit">login</button>
          </form>
        </div>

        {/* Toggle Panel (Overlay) */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="btn-transparent" id="login" onClick={() => setIsActive(false)}>
                login
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="btn-transparent" id="register" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;