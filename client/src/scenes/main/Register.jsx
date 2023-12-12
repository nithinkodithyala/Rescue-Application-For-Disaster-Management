import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();                                      

  const [formData, setFormData] = useState(() => {
    // Check if there's any saved form data in local storage and use it as initial state
    const savedFormData = localStorage.getItem('registrationFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      code: '',
      role: '',
    };
  });
  useEffect(() => {
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
  }, [formData]);

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.firstName)  {
      errors.firstName = 'firstName is required';
    }

    if (!data.lastName) {
      errors.lastName = 'lastName is required';
    }

    if (!data.code) {
      errors.code = 'Code is required';
    } else {
      const sum = Number(data.phoneNumber) -1;
      if (Number(data.code) !== sum) {
        errors.code = 'error please enter the correct code';
      }
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      axios.post("/user/signup", formData)
        .then((res) => {
          toast.success(res.data.message);
          navigate('/login');
        })
        .catch((err) => {
          console.log("post");
          toast.error(err.response.data.message);
        });
    } 
  };
  return (
    <Container>
      <Box>
        <Card>
          <Typography variant="h6" color="primary">Register</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="FirstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="LastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  error={!!formErrors.code}
                  helperText={formErrors.code}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="reliefCenter">Relief Center</MenuItem>
                  <MenuItem value="collectionCenter">Collection Center</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained">Create Account</Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;