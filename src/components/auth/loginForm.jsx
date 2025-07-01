import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginSchema } from "../../utils/validations/authSchemas";
import { authService } from "../../services/auth/authService";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      
      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(
          "No se pudo completar el inicio de sesión. Por favor, intente nuevamente."
        );
      }
    } catch (err) {
      const errorMessage =
        err.message ||
        err.response?.data?.message ||
        "Ocurrió un error al iniciar sesión. Por favor, intente nuevamente.";
      setError(errorMessage);
      console.error("Error en login:", err);
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
          gutterBottom
          sx={{
            color: "#463924",
            fontWeight: 600,
            fontSize: "24px",
            mb: 2,
          }}
        >
          Iniciar sesión
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
          Ingresa tu correo electrónico y contraseña para continuar
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          {...register("email")}
          autoComplete="email"
          autoFocus
          placeholder="esteban_schiller@gmail.com"
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
          autoComplete="current-password"
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register("remember")}
                sx={{
                  color: "#1c4384",
                  "&.Mui-checked": {
                    color: "#1c4384",
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{ color: "rgba(32, 34, 36, 0.6)", fontSize: "14px" }}
              >
                Recordar contraseña
              </Typography>
            }
          />
          <Link
            component={RouterLink}
            to="/forgotPassword"
            sx={{
              color: "rgba(32, 34, 36, 0.6)",
              fontSize: "14px",
              textDecoration: "none",
              "&:hover": {
                color: "rgba(32, 34, 36, 0.8)",
              },
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            height: "48px",
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
            "Iniciar sesión"
          )}
        </Button>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              display: "inline",
              color: "rgba(32, 34, 36, 0.6)",
              fontSize: "14px",
            }}
          >
            ¿No tienes una cuenta?{" "}
          </Typography>
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: "#5a8cff",
              fontSize: "14px",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Crear cuenta
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
