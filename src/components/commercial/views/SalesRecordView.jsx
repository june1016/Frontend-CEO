// src/components/sales/SalesRecordTab.jsx

import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Typography,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PercentIcon from "@mui/icons-material/Percent";

import SalesTable from "../common/sales/SalesTable";
import SalesIndicatorCard from "../common/sales/SalesIndicatorCard";


const vendors = ["Todos", "Juan Pérez", "María López"];
const types = ["Todos", "Mayorista", "Minorista"];

const SalesRecordView = () => {
    const [filters, setFilters] = useState({
        vendor: "Todos",
        type: "Todos",
        search: "",
    });

    const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const indicators = [
        {
            title: "Total Vendido",
            value: "$25.000.000",
            subtitle: "15 ventas",
            icon: <MonetizationOnIcon fontSize="large" />,
            colorKey: "green",
        },
        {
            title: "Ventas Mayoristas",
            value: "$22.750.000",
            subtitle: "5 clientes",
            icon: <StorefrontIcon fontSize="large" />,
            colorKey: "blue",
        },
        {
            title: "Ventas Minoristas",
            value: "$2.250.000",
            subtitle: "10 clientes",
            icon: <ShoppingCartIcon fontSize="large" />,
            colorKey: "orange",
        },
        {
            title: "Comisiones",
            value: "$250.000",
            subtitle: "2 vendedores",
            icon: <PercentIcon fontSize="large" />,
            colorKey: "purple",
        },
    ];

    return (
        <Box>
            {/* Filtros */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="subtitle2">Década Actual</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        label="Vendedor"
                        select
                        fullWidth
                        size="small"
                        value={filters.vendor}
                        onChange={(e) => handleChange("vendor", e.target.value)}
                    >
                        {vendors.map((v) => (
                            <MenuItem key={v} value={v}>
                                {v}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        label="Tipo de Venta"
                        select
                        fullWidth
                        size="small"
                        value={filters.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        {types.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Buscar por ID o cliente"
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            {/* Indicadores */}
            <Grid container spacing={2}>
                {indicators.map((indicator, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <SalesIndicatorCard {...indicator} />
                    </Grid>
                ))}
            </Grid>

            {/* Tabla de ventas */}
            <SalesTable filters={filters} />
        </Box>
    );
};

export default SalesRecordView;
