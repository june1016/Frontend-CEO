import React from "react";
import { Grid } from "@mui/material";
import FinancialSummaryCard from "./common/financialSummaryCard";
import DataTable from "./common/dataTable";

/**
 * Componente para mostrar la vista de datos generales
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.financialData - Datos financieros
 * @param {Object} props.totals - Totales por categoría
 * @param {Object} props.sortableData - Datos para ordenamiento
 * @param {Object} props.theme - Tema de Material UI
 * @returns {JSX.Element} - Componente renderizado
 */
const GeneralDataView = ({ financialData, totals, sortableData, theme }) => {
  const { order, orderBy, handleRequestSort, getSortedData } = sortableData;

  return (
    <>
      {/* Tarjetas de KPI */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(totals).map(([category, total]) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <FinancialSummaryCard category={category} total={total} />
          </Grid>
        ))}
      </Grid>

      {/* Tabla Detallada con ordenamiento */}
      <DataTable
        data={financialData}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        getSortedData={getSortedData}
        theme={theme}
      />
    </>
  );
};

export default GeneralDataView;
