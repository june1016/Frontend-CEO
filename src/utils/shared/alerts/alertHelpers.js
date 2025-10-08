import Swal from "sweetalert2";

/**
 * Muestra una alerta personalizada con SweetAlert2
 * @param {string} title - Título de la alerta
 * @param {string} message - Mensaje de la alerta
 * @param {string} [type="success"] - Tipo de alerta (success, error, warning, info)
 * @param {string} [buttonColor="#3085d6"] - Color del botón de confirmación
 * @param {Function} [callback=null] - Función a ejecutar después de confirmar
 */
export const showAlert = (
  title,
  message,
  type = "success",
  buttonColor = "#3085d6",
  callback = null
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: "OK",
    confirmButtonColor: buttonColor,
  }).then((result) => {
    if (result.isConfirmed && callback) {
      callback();
    }
  });
};

/**
 * Muestra una alerta de confirmación con opciones Sí/No
 * @param {string} title - Título de la alerta
 * @param {string} message - Mensaje de la alerta
 * @param {Function} confirmCallback - Función a ejecutar si se confirma
 * @param {Function} [cancelCallback=null] - Función a ejecutar si se cancela
 * @param {string} [confirmButtonText="Sí"] - Texto del botón de confirmación
 * @param {string} [cancelButtonText="No"] - Texto del botón de cancelación
 */
export const showConfirmation = (
  title,
  message,
  confirmCallback,
  cancelCallback = null,
  confirmButtonText = "Sí",
  cancelButtonText = "No"
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    } else if (cancelCallback) {
      cancelCallback();
    }
  });
};

