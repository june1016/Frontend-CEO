import { useEffect, useState } from "react";
import axiosInstance from "../../../services/api/axiosConfig";
import { getUserId } from "../../../utils/shared/operationTime";

const useMarketingConfiguration = () => {
  const [configuration, setConfiguration] = useState(null);
  const [createdByUsed, setCreatedByUsed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfiguration = async () => {
      setLoading(true);
      setError(null);

      try {
        const realUserId = getUserId();

        // 1. Buscar la configuración del usuario actual
        const userRes = await axiosInstance.get(
          "/marketing/getMarketingConfigurationByUser",
          {
            params: { user_id: realUserId },
          }
        );

        if (userRes.data?.configuration) {
          setConfiguration(userRes.data.configuration);
          setCreatedByUsed(realUserId);
          return;
        }

        // 2. Si no hay, intentar obtener la del docente
        let teacherId = null;

        try {
          const teacherRes = await axiosInstance.get(
            "/groupstudents/get-teacher-id",
            {
              params: { student_id: realUserId },
            }
          );

          teacherId = teacherRes.data?.teacher_id;
        } catch (err) {
          if (err.response?.status === 404) {
            console.warn("No se encontró docente asignado.");
            setError("No tienes configuración ni docente asignado.");
            return;
          } else {
            throw err;
          }
        }

        if (teacherId) {
          const teacherConfigRes = await axiosInstance.get(
            "/marketing/getMarketingConfigurationByUser",
            {
              params: { user_id: teacherId },
            }
          );

          if (teacherConfigRes.data?.configuration) {
            setConfiguration(teacherConfigRes.data.configuration);
            setCreatedByUsed(teacherId);
          } else {
            setError("Ni tú ni tu docente tienen configuración de marketing.");
          }
        }
      } catch (err) {
        console.error("Error inesperado:", err.message);
        setError("Error al cargar la configuración de marketing.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfiguration();
  }, []);

  return {
    configuration,
    createdByUsed,
    loading,
    error,
  };
};

export default useMarketingConfiguration;
