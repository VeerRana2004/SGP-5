import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Attempting to log in with the following credentials:');
    console.log('Email:', email);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      console.log('Invalid email format');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      console.log('Invalid password format');
      return;
    }

    try {
      console.log('Sending login request...');
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Login successful. Response:', response.data);
      
      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);
      // Store the username only if it's returned in the response
      if (response.data.username) {
        localStorage.setItem('username', response.data.username);
      }

      // Verify if data is stored correctly
      console.log('Stored Token:', localStorage.getItem('token'));
      console.log('Stored Username:', localStorage.getItem('username'));

      // Navigate to the home page
      navigate('/home');
    } catch (err) {
      console.log('Login error:', err);
      if (!err.response) {
        setError('Network error. Please try again later.');
        console.log('Network error occurred');
      } else {
        setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        console.log('Error from server:', err.response?.data?.error);
      }
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i 
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} 
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button type="submit" className="button2">Login</button>
        <a href="/signup" className="forgot-username">Create New Account...</a>
      </form>
    </div>
  );
};

export default Login;
