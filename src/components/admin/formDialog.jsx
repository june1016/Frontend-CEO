import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Autocomplete,
  Chip
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const FormDialog = ({
  open,
  title,
  onClose,
  onSave,
  schema,
  fields,
  defaultValues
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

useEffect(() => {
  console.log("🟡 Default values recibidos:", defaultValues); // 👈 Aquí

  reset(defaultValues);
}, [defaultValues, open]);

  const handleFormSubmit = (data) => {
    onSave(data);
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ pt: 2 }}>
          {fields.map((field) => {
            if (field.type === "text") {
              return (
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field: f }) => (
                    <TextField
                      {...f}
                      fullWidth
                      label={field.label}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                      margin="normal"
                    />
                  )}
                />
              );
            }

            if (field.type === "select") {
              return (
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field: f }) => (
                    <TextField
                      {...f}
                      fullWidth
                      select
                      label={field.label}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                      margin="normal"
                    >
                      {field.options.map((opt, idx) => (
                        <MenuItem key={idx} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              );
            }

            if (field.type === "autocomplete") {
              return (
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field: f }) => (
                    <Autocomplete
                      {...f}
                      multiple={field.multiple}
                      options={field.options}
                      getOptionLabel={field.getOptionLabel}
                      value={f.value || (field.multiple ? [] : null)}
                      onChange={(_, value) => f.onChange(value)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            label={field.getOptionLabel(option)}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          margin="normal"
                          error={!!errors[field.name]}
                          helperText={errors[field.name]?.message}
                        />
                      )}
                    />
                  )}
                />
              );
            }

            return null;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
