import React from "react";
import { Container, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  setCollectionCenter,
  setAdmin,
  setReliefCenter,
} from "../../store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form validation
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateFormData = (data) => {
    const errors = {};

    // Email validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!data.password) {
      errors.password = "Password is required";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
    }

    return errors;
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    setFormErrors(errors);
    const form = {
      email: formData.email,
      password: formData.password,
    };

    if (Object.keys(errors).length === 0) {
      console.log("No errors");
      // no error post api
      axios
        .post("/user/signin", form)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          Cookie.set("Token", res.data.token);

          if (res.data.role === "reliefCenter") {
            dispatch(setReliefCenter(res.data.userID));
            navigate("/volunteer/relief-center");
          } else if (res.data.role === "admin") {
            dispatch(setAdmin(res.data.userID));
            navigate("/admin");
          } else {
            dispatch(setCollectionCenter(res.data.userID));
            navigate("/volunteer/collection-center");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } else {
      console.log("Errors Found");
    }
  };

  return (
    <Container minWidth="md" maxWidth="md">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "8rem",
        }}
      >
        <Card
          sx={{
            width: "40%",
            borderRadius: "1rem",
            p: "1rem",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: '20rem'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            Login
          </Typography>

          <Box component="form" onSubmit={HandleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/register">
                    <Link component="span" variant="caption">
                      {"Create a New Account"}
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;