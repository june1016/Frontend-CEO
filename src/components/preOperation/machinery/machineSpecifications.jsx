import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    Stack,
    Paper,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";

const MachineSpecifications = ({ machine }) => {
    const theme = useTheme();

    if (!machine?.Specification) return null;

    const spec = machine.Specification;

    return (
        <Card sx={{ mt: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: 2 }}>
            <CardHeader
                avatar={<BuildIcon sx={{ color: theme.palette.primary.main }} />}
                title={
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        Especificaciones Técnicas de {machine.name}
                    </Typography>
                }
                sx={{
                    backgroundColor: theme.palette.grey[100],
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            />
            <CardContent>
                {/* Sección 1: Capacidad y tiempos */}
                <Box mb={4}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                        gutterBottom
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            p: 1.2,
                            borderRadius: 1,
                            color: "white",
                        }}
                    >
                        Capacidad y Tiempos
                    </Typography>
                    <Stack spacing={1} mt={1}>
                        <Detail label="Capacidad Base" value={`${spec.base_capacity} min/mes`} />
                        <Detail label="Tiempo Preparación" value={`${spec.setup_time} min`} />
                        <Detail label="Tiempo Producción" value={`${spec.production_time} min/unidad`} />
                        <Detail label="Tiempo Mantenimiento" value={`${spec.maintenance_time} horas`} />
                    </Stack>
                </Box>

                {/* Sección 2: Capacidad Productiva Estándar */}
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                        gutterBottom
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            p: 1.2,
                            borderRadius: 1,
                            color: "white",
                        }}
                    >
                        Capacidad Productiva Estándar
                    </Typography>
                    <Stack spacing={1} mt={1}>
                        <Detail label="Producción Diaria Estándar" value={`${spec.daily_standard_output} unidades/día`} />
                        <Detail label="Capacidad Mensual Máxima" value={`${spec.max_monthly_capacity} unidades/mes`} />
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

const Detail = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
        <Typography variant="body2" fontWeight={500} color="text.secondary">
            {label}
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="text.primary">
            {value}
        </Typography>
    </Box>
);

export default MachineSpecifications;
