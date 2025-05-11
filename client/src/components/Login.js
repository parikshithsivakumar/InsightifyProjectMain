import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Link,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
     const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store token in localStorage
        localStorage.setItem('authToken', data.token);

        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <Link href="/signup" underline="hover">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
}
