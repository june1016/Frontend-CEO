import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Alert,
} from "@mui/material";
import InfoCard from "../../common/infoCard";
import MarketingProductCard from "../common/MarketingProductCard";

const baseSuggested = {
    percent: 10,
    cost: 4000000,
};

const initialData = [
    { name: "Alfaros", investmentPercent: 0 },
    { name: "Betacos", investmentPercent: 5 },
    { name: "Gamaroles", investmentPercent: 10 },
];

const MarketingView = () => {
    const [products, setProducts] = useState(initialData);

    const handleChange = (idx, value) => {
        const updated = [...products];
        updated[idx].investmentPercent = value;
        setProducts(updated);
    };

    const handleSave = (product) => {
        console.log("Guardar marketing:", product.name, product);
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
                Inversión en Marketing y Publicidad
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Configuración de inversión por producto
            </Typography>

            <InfoCard
                title="Información de Inversión"
                description={
                    <>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li>
                                Inversión base sugerida: $
                                {baseSuggested.cost.toLocaleString()} (
                                {baseSuggested.percent}% incremento potencial)
                            </li>
                            <li>Costo por punto porcentual adicional: ${Math.round(baseSuggested.cost / baseSuggested.percent).toLocaleString()}</li>
                            <li>La inversión aumenta la probabilidad de alcanzar las ventas proyectadas</li>
                            <li>No invertir puede resultar en hasta 20% menos de las ventas esperadas</li>
                        </ul>
                    </>
                }
            />

            <Alert
                severity="warning"
                sx={{
                    mb: 2,
                    borderLeft: "4px solid",
                    borderColor: "warning.main",
                    fontWeight: 500,
                    fontSize: "0.95rem"
                }}
            >
                Riesgo sin inversión: hasta 20% menos en ventas proyectadas
            </Alert>

            <Grid container spacing={2} mt={2}>
                {products.map((product, idx) => (
                    <Grid item xs={12} md={4} key={product.name}>
                        <MarketingProductCard
                            product={product}
                            baseSuggested={baseSuggested}
                            onChange={(val) => handleChange(idx, val)}
                            onSave={() => handleSave(product)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MarketingView;
