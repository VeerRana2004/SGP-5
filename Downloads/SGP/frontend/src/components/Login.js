import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        username, // Include username in the request payload
        password
      });

      // Save the token to localStorage or state
      localStorage.setItem('token', response.data.token);

      // Navigate to the home page
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  // Determine the width of the password field based on username length
  const passwordWidth = username.length < 5 ? '200px' : '300px'; // Example sizes

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: passwordWidth }} // Apply dynamic width
          />
          <i 
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} 
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button type="submit" className="button">Login</button>
        <a href="/signup" className="forgot-username">Create New Account...</a>
      </form>
    </div>
  );
};

export default Login;
