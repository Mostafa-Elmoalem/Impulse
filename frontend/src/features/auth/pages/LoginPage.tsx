import { useState } from 'react';
import '../Auth.css';

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  // States for form inputs...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="auth-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        
        {/* Sign Up Form (يظهر عند التحرك لليسار) */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            <span className="subtitle">Register with your email</span>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
          </form>
        </div>

        {/* Sign In Form (يظهر افتراضياً على اليسار) */}
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>
            <span className="subtitle">Sign in with your email</span>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <a href="#">Forgot Your Password?</a>
            <button>Login</button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="toggle-container">
          <div className="toggle">
            {/* Left Panel: يظهر عند التسجيل للعودة للدخول */}
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={() => setIsActive(false)}>
                Login
              </button>
            </div>
            
            {/* Right Panel: يظهر افتراضياً لدعوة المستخدم للتسجيل */}
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register" onClick={() => setIsActive(true)}>
                Register
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;