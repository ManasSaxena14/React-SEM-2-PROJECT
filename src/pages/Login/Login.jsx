import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useContext(CoinContext);

  useEffect(() => {
    // If already logged in, redirect to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!loginForm.email || !loginForm.password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      await login(loginForm.email, loginForm.password);
      setSuccess('Logged in successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirm) {
      setError('Please fill all fields.');
      return;
    }
    if (signupForm.password !== signupForm.confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register(signupForm.email, signupForm.password);
      setSuccess('Account created! You can now log in.');
      setActiveTab('login');
      setSignupForm({ name: '', email: '', password: '', confirm: '' });
    } catch (err) {
      setError(err.message || 'Signup failed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={activeTab === 'login' ? 'active' : ''} onClick={() => handleTab('login')}>Login</button>
          <button className={activeTab === 'signup' ? 'active' : ''} onClick={() => handleTab('signup')}>Sign Up</button>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => handleChange(e, 'login')}
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => handleChange(e, 'login')}
              autoComplete="current-password"
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup} autoComplete="off">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signupForm.name}
              onChange={(e) => handleChange(e, 'signup')}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={(e) => handleChange(e, 'signup')}
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={(e) => handleChange(e, 'signup')}
              autoComplete="new-password"
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={signupForm.confirm}
              onChange={(e) => handleChange(e, 'signup')}
              autoComplete="new-password"
            />
            <button type="submit">Sign Up</button>
        </form>
        )}
      </div>
    </div>
  );
};

export default Login; 