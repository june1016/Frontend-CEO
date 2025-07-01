// src/components/sales/common/SalesBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

const data = [
  { name: "Década 1", Meta: 140000000, Real: 100000000, Proyectado: 120000000 },
  { name: "Década 2", Meta: 105000000, Real: 90000000, Proyectado: 95000000 },
  { name: "Década 3", Meta: 70000000, Real: 50000000, Proyectado: 60000000 },
];

const SalesBarChart = () => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={ 
          <Box display="flex" alignItems="center" gap={1}>
            <BarChartIcon color="primary"/>
            <Typography variant="h6" fontWeight={600}>
              Seguimiento por Década
            </Typography>
          </Box>
        }
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 1,
        }}
      />
      <CardContent>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="16%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke={theme.palette.text.secondary}
              />
              <YAxis
                tickFormatter={(val) => `$${val / 1e6}M`}
                stroke={theme.palette.text.secondary}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? `$${value.toLocaleString()}`
                    : value
                }
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                iconSize={12}
                verticalAlign="bottom"
                height={16}
              />
              <Bar
                dataKey="Meta"
                fill={theme.palette.grey[700]}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Real"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Proyectado"
                fill={theme.palette.success.main}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesBarChart;
