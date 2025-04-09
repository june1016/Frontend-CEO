import Swal from "sweetalert2";

const showAlert = (title, message, type = "success", buttonColor = "#3085d6", callback = null) => {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: "OK",
        confirmButtonColor: buttonColor
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback();
        }
    });
};

export default showAlert;