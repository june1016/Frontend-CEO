import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button, Divider } from "@mui/material";

const AccountsReceivableSummary = ({ receivables, onCollect }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Estado de Cartera
            </Typography>
            <Grid container spacing={2}>
                {receivables.map((credit, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Créditos a {credit.term} días
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Total por Cobrar: <strong>${credit.amount.toLocaleString()}</strong>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Fecha Vencimiento: {credit.dueDate}
                                </Typography>
                                <Divider sx={{ my: 1.5 }} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => onCollect(credit)}
                                >
                                    Cobrar créditos
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AccountsReceivableSummary;
