import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
import { resetPasswordSchema } from "../../utils/validations/authSchemas";
import { authService } from "../../services/auth/authService";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await authService.resetPassword(token, data.password);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("No se pudo restablecer la contraseña. Intente nuevamente.");
      }
    } catch (err) {
      const errorMessage =
        err.message ||
        "Ocurrió un error al procesar su solicitud. Por favor, intente nuevamente.";
      setError(errorMessage);
      console.error("Error en restablecimiento de contraseña:", err);
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
            Contraseña actualizada
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
            Su contraseña ha sido restablecida exitosamente.
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
          Restablecer contraseña
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(32, 34, 36, 0.8)" }}>
          Ingrese su nueva contraseña
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
          label="Nueva contraseña"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={inputStyles}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirmar contraseña"
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === getValues("password") || "Las contraseñas no coinciden",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
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
            "Restablecer contraseña"
          )}
        </Button>
      </Box>
    </Box>
  );
}
