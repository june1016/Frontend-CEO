import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { forgotPasswordSchema } from "../../utils/validators/authSchemas";
import { authService } from "../../services/auth/authService";

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await authService.requestPasswordReset(data.email);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("No se pudo enviar la solicitud. Intente nuevamente.");
      }
    } catch (err) {
      const errorMessage =
        err.message ||
        "Ocurrió un error al procesar su solicitud. Por favor, intente nuevamente.";
      setError(errorMessage);
      console.error("Error en recuperación de contraseña:", err);
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

  if (isSubmitted) {
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
        <Box sx={{ textAlign: "center", mb: 3 }}>
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
            Solicitud enviada
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
            Se ha enviado un correo electrónico con instrucciones para
            restablecer su contraseña. Por favor, revise su bandeja de entrada.
          </Typography>
        </Box>
        <Link
          component={RouterLink}
          to="/login"
          sx={{
            display: "block",
            textAlign: "center",
            color: "#5a8cff",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Volver al inicio de sesión
        </Link>
      </Box>
    );
  }

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
          Recuperar contraseña
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
          Ingrese su correo electrónico y le enviaremos instrucciones para
          restablecer su contraseña.
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
          label="Correo electrónico"
          placeholder="ejemplo@correo.com"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={inputStyles}
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
            "Enviar instrucciones"
          )}
        </Button>

        <Box sx={{ textAlign: "center" }}>
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
            Volver al inicio de sesión
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
