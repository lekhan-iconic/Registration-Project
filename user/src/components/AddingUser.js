import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  borderRadius: "16px",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddUser = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/adduser", {
        fname,
        lname,
        email,
        phone,
        dob,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMessage("Enter the details correctly");
        console.log(err);
      });
  };

  return (
    <Container maxWidth="md">
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          mt: 2,
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          mt: 3,
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <PersonAddIcon sx={{ fontSize: 35 }} />
        Add New User
      </Typography>

      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                onFocus={clearErrorMessage}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                onFocus={clearErrorMessage}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={clearErrorMessage}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <StyledTextField
                fullWidth
                type="date"
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                onFocus={clearErrorMessage}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: new Date().toISOString().split("T")[0], // Prevents future dates
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                type="number"
                label="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={clearErrorMessage}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {errorMessage && (
                <Typography
                  color="error"
                  variant="body2"
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.12)",
                  "&:hover": {
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.16)",
                  },
                }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default AddUser;
