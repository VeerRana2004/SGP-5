import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Check if all fields are filled
    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

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

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        username,
        password,
      });
      console.log('Signup successful', response.data);
      
      // Save the username to localStorage
      localStorage.setItem('username', response.data.username); 

      navigate('/login'); // Redirect after successful signup
    } catch (err) {
      console.error('Error during signup', err.response?.data);
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="button1" disabled={loading}>
          {loading ? 'Signing Up...' : 'Signup'}
        </button>
        <a href="/login" className="forgot-username">Login</a>
      </form>
    </div>
  );
};

export default Signup;
