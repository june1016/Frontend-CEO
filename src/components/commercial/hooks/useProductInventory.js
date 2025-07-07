import { useEffect, useState } from "react";
import axiosInstance from "../../../services/api/axiosConfig";
import { getUserId } from "../../../utils/timeManagement/operationTime";


const useProductInventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [createdByUsed, setCreatedByUsed] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            setError(null);

            try {
                const realUserId = getUserId();
                const studentRes = await axiosInstance.get("productsInventory/getProductInventoryByCreatedBy", {
                    params: { created_by: realUserId },
                });

                const studentProducts = studentRes.data.inventories || [];


                if (studentProducts.length > 0) {
                    setProducts(formatProducts(studentProducts));
                    setCreatedByUsed(realUserId);
                    return;
                }

                let teacherId = null;

                try {
                    const teacherRes = await axiosInstance.get("/groupstudents/get-teacher-id", {
                        params: { student_id: realUserId },
                    });
                    teacherId = teacherRes.data?.teacher_id;
                } catch (err) {
                    if (err.response?.status === 404) {
                        console.warn("No se encontró docente, pero no es error fatal.");
                        setError("No tienes un docente asignado y tampoco tienes productos.");
                        setProducts([]);
                        return;
                    } else {
                        throw err;
                    }
                }

                const teacherInventoryRes = await axiosInstance.get("productsInventory/getProductInventoryByCreatedBy", {
                    params: { created_by: teacherId },
                });

                const teacherProducts = teacherInventoryRes.data.inventories || [];

                if (teacherProducts.length > 0) {
                    setProducts(formatProducts(teacherProducts));
                    setCreatedByUsed(teacherId);
                } else {
                    setError("Ni tú ni tu docente tienen productos registrados.");
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error inesperado:", err.message);
                setError("Error al cargar el inventario.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);


    const formatProducts = (inventory) => {
        return inventory.map((item) => ({
            id: item.product_id,
            name: item.Product?.name || "Sin nombre",
            unit_cost: item.unit_cost,
            credit30: item.credit30,
            credit60: item.credit60,
            investment_percent: item.investment_percent,
            quantity: item.quantity,
            suggestedMin: item.unit_cost * 0.9,
            suggestedMax: item.unit_cost * 1.2,
            currentPrice: item.unit_cost,
        }));
    };

    return { products, loading, error };
};

export default useProductInventory;
