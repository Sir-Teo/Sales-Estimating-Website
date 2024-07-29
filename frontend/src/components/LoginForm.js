import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

const LoginForm = ({ onLogin, onRegister, forceLoginMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (forceLoginMode) {
      setIsLogin(true);
      setError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [forceLoginMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }
      try {
        await onLogin({ email, password });
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (!email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      try {
        await onRegister({ email, password });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isLogin && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {isLogin ? 'Sign In' : 'Register'}
      </Button>
      <Link
        component="button"
        variant="button"
        onClick={toggleMode}
        sx={{ display: 'block', textAlign: 'center' }}
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
      </Link>
    </Box>
  );
};

export default LoginForm;