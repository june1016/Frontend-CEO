import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerSchema } from "../../utils/validators/authSchemas";
import { authService } from "../../services/auth/authService";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await authService.register({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError("No se pudo completar el registro. Intente nuevamente.");
      }
    } catch (err) {
      setError(
        err.message ||
          err.response?.data?.message ||
          "Ocurrió un error al registrar. Intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      height: "48px",
      backgroundColor: "#f1f4f9",
      "& fieldset": {
        borderColor: "#d7d7d7",
      },
      "&:hover fieldset": {
        borderColor: "#1c4384",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1c4384",
        borderWidth: "2px",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        bgcolor: "background.paper",
        borderRadius: "24px",
        p: 4,
        boxShadow: 3,
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "#463924",
            fontWeight: 600,
            fontSize: "24px",
            mb: 2,
          }}
        >
          Crear cuenta
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
          Complete los siguientes campos para registrarse
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Nombre"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Apellido"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              sx={inputStyles}
            />
          </Grid>
        </Grid>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo electrónico"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={inputStyles}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={inputStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirmar Contraseña"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            validate: (value) => {
              const password = getValues("password");
              return password === value || "Las contraseñas no coinciden";
            },
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={inputStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            height: "48px",
            mt: 3,
            mb: 2,
            bgcolor: "#1c4384",
            "&:hover": {
              bgcolor: "rgba(28, 67, 132, 0.9)",
            },
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "6px",
            boxShadow: "none",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Crear cuenta"
          )}
        </Button>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              display: "inline",
              color: "rgba(32, 34, 36, 0.6)",
              fontSize: "14px",
            }}
          >
            ¿Ya tienes una cuenta?{" "}
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: "#5a8cff",
              textDecoration: "none",
              fontSize: "14px",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Iniciar sesión
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
